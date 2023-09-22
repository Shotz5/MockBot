import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder, ChannelType, VoiceChannel } from "discord.js";
import { getVoiceConnection } from '@discordjs/voice';
import { MySlashCommand } from "../../utils/classes";
import { MockResponses } from "../../utils/enums";

export const MockLeaveVC: MySlashCommand = {
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