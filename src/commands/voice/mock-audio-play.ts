import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { AudioPlayerStatus, createAudioResource, getVoiceConnection, VoiceConnectionStatus } from '@discordjs/voice';
import { ResourceMetadata, ISlashCommand, IAudioPlayer, InfoEmbedBuilder } from "../../utils/types";
import { MockResponses } from "../../utils/translations";
import { clipStringToLength } from "../../utils/strings";
import play from "play-dl";

export const MockAudioPlay: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-audio-play')
        .setDescription('Play audio in a voice channel from YouTube')
        .addStringOption(builder => 
            builder.setName('url')
                .setDescription('The youtube audio to play')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        // This takes > 3 seconds to run sometimes, so a defer must be used
        await interaction.deferReply({ ephemeral: true });

        let embed = new InfoEmbedBuilder();
        let url = interaction.options.getString('url', true);

        // If command was not executed in a guild (how the fuck they could idk)
        if (!interaction.guildId) {
            embed.setTitle(MockResponses.GuildNotFound);
            await interaction.editReply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        // If the url is not a youtube URL as per play-dls validation
        let validateUrl = await play.validate(url);
        if (!validateUrl || validateUrl != "yt_video") {
            embed.setTitle(MockResponses.UrlInvalid);
            await interaction.editReply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        // If the connection is not in a ready state or doesn't exist
        let connection = getVoiceConnection(interaction.guildId);
        if (!connection || connection.state.status != VoiceConnectionStatus.Ready) {
            embed.setTitle(MockResponses.NotConnected);
            await interaction.editReply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        // If the connection is not subscribed to an audio player
        if (!connection.state.subscription) {
            embed.setTitle(MockResponses.SubscriptionError);
            await interaction.editReply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        try {
            // Fails if age restricted
            let stream = await play.stream(url, {
                discordPlayerCompatibility: true,
            });

            let videoInfo = await play.video_info(url, { htmldata: false });

            let metaData = new ResourceMetadata({
                title: videoInfo.video_details.title,
                url: url,
                author: videoInfo.video_details.channel,
                description: clipStringToLength(videoInfo.video_details.description, 150),
                image: videoInfo.video_details.thumbnails[3].url,
            });

            let resource = createAudioResource(stream.stream);
            // Upcast AudioPlayer back to IAudioPlayer
            let player = connection.state.subscription.player as IAudioPlayer;
            // Queue item user wanted to play
            let queueEmbed = player.enqueue(resource, metaData);

            // If already playing, only queue, stop here
            if (player.state.status != AudioPlayerStatus.Idle) {
                await interaction.editReply({ content: "Added the following item to the queue", embeds: [queueEmbed.toEmbedBuilder()] });
                return;
            }

            // Else play as well
            let playerEmbed = player.play();

            // If play failed because there's nothing in the queue (should never happen...)
            if (!playerEmbed) {
                embed.setTitle(MockResponses.PlayError);
                await interaction.editReply({ embeds: [embed.toEmbedBuilder()] });
                return;
            }

            await interaction.editReply({ embeds: [playerEmbed.toEmbedBuilder()] });

        } catch (e: any) {

            if (e instanceof Error) {
                embed.setTitle(MockResponses.PlayError + "\n" + e.message);
                await interaction.editReply({ embeds: [embed.toEmbedBuilder()] });
            }

        }
    }
}