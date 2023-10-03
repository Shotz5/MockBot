import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus } from '@discordjs/voice';
import { IEmbedInfoBuilder, ISlashCommand } from "../../utils/types";
import { MockResponses } from "../../utils/translations";

export const MockAudioStop: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-audio-stop')
        .setDescription('Stop the bot from playing audio in this guild'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        const embed = new IEmbedInfoBuilder();

        if (!interaction.guildId) {
            embed.title = MockResponses.GuildNotFound;
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

        if (connection.state.subscription.player.state.status == AudioPlayerStatus.Idle) {
            embed.title = MockResponses.NotPlaying;
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        if (!connection.state.subscription.player.stop()) {
            embed.title = MockResponses.StopError;
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        embed.title = MockResponses.Stopped;
        await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
    }
}