import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus } from '@discordjs/voice';
import { IAudioPlayer, InfoEmbedBuilder, ISlashCommand } from "../../utils/types";
import { MockResponses } from "../../utils/translations";

export const MockAudioStop: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-audio-stop')
        .setDescription('Stop the bot from playing audio in this guild, will clear the queue'),
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

        if (connection.state.subscription.player.state.status == AudioPlayerStatus.Idle) {
            embed.setTitle(MockResponses.NotPlaying);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        let player = connection.state.subscription.player as IAudioPlayer;
        if (!player.stop()) {
            embed.setTitle(MockResponses.StopError);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        embed.setTitle(MockResponses.Stopped);
        await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
    }
}