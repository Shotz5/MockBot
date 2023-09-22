import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder, } from "discord.js";
import { getVoiceConnection } from '@discordjs/voice';
import { ISlashCommand, MockResponses } from "../../utils/types";

export const MockLeaveVC: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-leave-vc')
        .setDescription('Tell the bot to leave the voice channel'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        if (!interaction.guildId) {
            await interaction.reply(MockResponses.GuildNotFound);
            return;
        }

        let connection = getVoiceConnection(interaction.guildId);
        if (!connection) {
            await interaction.reply(MockResponses.NotConnected);
            return;
        }

        connection.destroy();

        await interaction.reply(MockResponses.LeaveVC);
    }
}