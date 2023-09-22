import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { AudioPlayerStatus, createAudioResource, getVoiceConnection, VoiceConnectionStatus } from '@discordjs/voice';
import { ISlashCommand } from "../../utils/classes";
import { MockResponses } from "../../utils/enums";
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
        let url = interaction.options.getString('url', true);

        if (!interaction.guildId) {
            await interaction.reply(MockResponses.GuildNotFound);
            return;
        }

        let validateUrl = await play.validate(url);
        if (!validateUrl || validateUrl == "search") {
            await interaction.reply(MockResponses.UrlInvalid);
            return;
        }

        let connection = getVoiceConnection(interaction.guildId);
        if (!connection || connection.state.status != VoiceConnectionStatus.Ready) {
            await interaction.reply(MockResponses.NotConnected);
            return;
        }

        if (!connection.state.subscription) {
            await interaction.reply(MockResponses.SubscriptionError);
            return;
        }

        if (connection.state.subscription.player.state.status != AudioPlayerStatus.Idle) {
            await interaction.reply(MockResponses.AlreadyPlaying);
            return;
        }

        let stream = await play.stream(url, {
            discordPlayerCompatibility: true,
        });

        let resource = createAudioResource(stream.stream);
        connection.state.subscription.player.play(resource);

        await interaction.reply(MockResponses.Playing);
    }
}