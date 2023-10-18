import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus } from '@discordjs/voice';
import { InfoEmbedBuilder, ISlashCommand } from "../../utils/types";
import { MockResponses } from "../../utils/translations";

export const MockAudioUnpause: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-audio-unpause')
        .setDescription('Pause the bots audio in this guild.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        const embed = new InfoEmbedBuilder();

        if (!interaction.guildId) {
            embed.setTitle(MockResponses.GuildNotFound);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        let connection = getVoiceConnection(interaction.guildId);
        if (!connection || connection.state.status != VoiceConnectionStatus.Ready) {
            embed.setTitle(MockResponses.NotConnected);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        if (!connection.state.subscription) {
            embed.setTitle(MockResponses.SubscriptionError);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        if (connection.state.subscription.player.state.status != AudioPlayerStatus.Paused) {
            embed.setTitle(MockResponses.NotPaused);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        if (!connection.state.subscription.player.unpause()) {
            embed.setTitle(MockResponses.UnpauseError);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        embed.setTitle(MockResponses.Playing);
        await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
    }
}