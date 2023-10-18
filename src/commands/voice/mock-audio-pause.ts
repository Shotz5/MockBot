import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus } from '@discordjs/voice';
import { InfoEmbedBuilder, ISlashCommand } from "../../utils/types";
import { MockResponses } from "../../utils/translations";

export const MockAudioPause: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-audio-pause')
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

        if (connection.state.subscription.player.state.status != AudioPlayerStatus.Playing) {
            embed.setTitle(MockResponses.NotPlaying);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        if (!connection.state.subscription.player.pause()) {
            embed.setTitle(MockResponses.PauseError);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        embed.setTitle(MockResponses.Paused);
        await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
    }
}