import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder, } from "discord.js";
import { getVoiceConnection } from '@discordjs/voice';
import { InfoEmbedBuilder, ISlashCommand } from "../../utils/types";
import { MockResponses } from "../../utils/translations";

export const MockLeaveVC: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-leave-vc')
        .setDescription('Tell the bot to leave the voice channel'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        const embed = new InfoEmbedBuilder();

        if (!interaction.guildId) {
            embed.setTitle(MockResponses.GuildNotFound);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        let connection = getVoiceConnection(interaction.guildId);
        if (!connection) {
            embed.setTitle(MockResponses.NotConnected);
            await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
            return;
        }

        connection.destroy();

        embed.setTitle(MockResponses.LeaveVC);
        await interaction.reply({ embeds: [embed.toEmbedBuilder()], ephemeral: true });
    }
}