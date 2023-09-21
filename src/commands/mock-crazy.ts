import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { mock } from '../utils/functions';
import { MySlashCommand } from '../utils/classes';

export const MockCrazy: MySlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-crazy')
        .setDescription('Crazy? I was crazy once.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let message = mock('Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy.');
        await interaction.reply(message);
    }
}