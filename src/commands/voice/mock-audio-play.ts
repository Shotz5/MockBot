import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { AudioPlayerStatus, createAudioResource, getVoiceConnection, VoiceConnectionStatus } from '@discordjs/voice';
import { IEmbedInfoBuilder, IEmbedPlayingBuilder, ISlashCommand } from "../../utils/types";
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
        let embed = new IEmbedInfoBuilder();
        let url = interaction.options.getString('url', true);

        if (!interaction.guildId) {
            embed.title = MockResponses.GuildNotFound;
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        let validateUrl = await play.validate(url);
        if (!validateUrl || validateUrl != "yt_video") {
            embed.title = MockResponses.UrlInvalid;
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        let connection = getVoiceConnection(interaction.guildId);
        if (!connection || connection.state.status != VoiceConnectionStatus.Ready) {
            embed.title = MockResponses.NotConnected;
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        if (!connection.state.subscription) {
            embed.title = MockResponses.SubscriptionError;
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        if (connection.state.subscription.player.state.status != AudioPlayerStatus.Idle) {
            embed.title = MockResponses.AlreadyPlaying;
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        try {
            // Fails if age restricted
            let stream = await play.stream(url, {
                discordPlayerCompatibility: true,
            });

            let videoInfo = await play.video_info(url, { htmldata: false });

            let playEmbed = new IEmbedPlayingBuilder({
                title: videoInfo.video_details.title,
                url: url,
                author: videoInfo.video_details.channel,
                description: clipStringToLength(videoInfo.video_details.description, 150),
                image: videoInfo.video_details.thumbnails[3].url,
            });

            let resource = createAudioResource(stream.stream);
            connection.state.subscription.player.play(resource);

            await interaction.reply({ embeds: [playEmbed.toEmbedBuilder()] });

        } catch (e: any) {

            if (e instanceof Error) {
                embed.title = MockResponses.PlayError + "\n" + e.message;
                await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            }

        }
    }
}