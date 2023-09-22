import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { generateMockSentence } from '../../utils/functions';
import { stupidBusinessBuzzwords, connectors } from '../../utils/arrays';
import { ISlashCommand } from '../../utils/classes';

export const MockBusiness: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-business')
        .setDescription('Sends a string that mocks the dum business majors.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let message = generateMockSentence(stupidBusinessBuzzwords, connectors);
        await interaction.reply(message);
    }
}