import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus } from '@discordjs/voice';
import { InfoEmbedBuilder, ISlashCommand, IAudioPlayer } from "../../utils/types";
import { MockResponses } from "../../utils/translations";

export const MockAudioSkip: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-audio-skip')
        .setDescription('Skip the currently playing audio in this guild.'),
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

        let player = connection.state.subscription.player as IAudioPlayer;
        let playerEmbed = player.skip();
        if (!playerEmbed) {
            embed.setTitle(MockResponses.QueueEmpty);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        await interaction.reply({ embeds: [playerEmbed.toEmbedBuilder()] });
    }
}