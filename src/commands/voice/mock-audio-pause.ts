import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus } from '@discordjs/voice';
import { ISlashCommand } from "../../utils/classes";
import { MockResponses } from "../../utils/enums";

export const MockAudioPause: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-audio-pause')
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

        if (connection.state.subscription.player.state.status != AudioPlayerStatus.Playing) {
            await interaction.reply(MockResponses.NotPlaying);
            return;
        }

        connection.state.subscription.player.pause();

        await interaction.reply(MockResponses.Paused);
    }
}