import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { mock } from '../../utils/mock-factory';
import { ISlashCommand } from '../../utils/types';

export const MockText: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-text')
        .setDescription('Mocks the text passed into it.')
        .addStringOption(option => 
            option.setName('text')
                .setDescription('The text to mock')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let mockSentence = mock(interaction.options.getString('text', true));
        await interaction.reply(mockSentence);
    }
}