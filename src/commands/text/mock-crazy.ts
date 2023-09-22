import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { mock } from '../../utils/mock-factory';
import { ISlashCommand } from '../../utils/types';

export const MockCrazy: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-crazy')
        .setDescription('Crazy? I was crazy once.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let message = mock('Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy.');
        await interaction.reply(message);
    }
}