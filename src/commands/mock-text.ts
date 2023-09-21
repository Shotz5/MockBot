import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import * as helpers from '../utils/functions';
import { MySlashCommand } from '../utils/classes';

export const MockText: MySlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-text')
        .setDescription('Mocks the text passed into it.')
        .addStringOption(option => 
            option.setName('text')
                .setDescription('The text to mock')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let mockSentence = helpers.mock(interaction.options.getString('text', true));
        await interaction.reply(mockSentence);
    }
}