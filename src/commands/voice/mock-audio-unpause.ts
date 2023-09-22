import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus } from '@discordjs/voice';
import { ISlashCommand, MockResponses } from "../../utils/types";

export const MockAudioUnPause: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-audio-unpause')
        .setDescription('Pause the bots audio in this guild.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        if (!interaction.guildId) {
            await interaction.reply(MockResponses.GuildNotFound);
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

        if (connection.state.subscription.player.state.status != AudioPlayerStatus.Paused) {
            await interaction.reply(MockResponses.NotPaused);
            return;
        }

        connection.state.subscription.player.unpause();

        await interaction.reply(MockResponses.Playing);
    }
}