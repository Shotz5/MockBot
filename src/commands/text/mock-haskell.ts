import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { generateMockSentence } from '../../utils/mock-factory';
import { haskellBuzzWords, connectors } from '../../utils/arrays';
import { ISlashCommand } from '../../utils/types';

export const MockHaskell: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-haskell')
        .setDescription('Sends a string that mocks the Haskell "programming" language.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let message = generateMockSentence(haskellBuzzWords, connectors);
        await interaction.reply(message);
    }
}