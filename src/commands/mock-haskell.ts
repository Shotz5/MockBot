import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { generateMockSentence } from '../utils/functions';
import { haskellBuzzWords, connectors } from '../utils/arrays';
import { MySlashCommand } from '../utils/classes';

export const MockHaskell: MySlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-haskell')
        .setDescription('Sends a string that mocks the Haskell "programming" language.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let message = generateMockSentence(haskellBuzzWords, connectors);
        await interaction.reply(message);
    }
}