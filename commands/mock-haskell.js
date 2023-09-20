const { SlashCommandBuilder } = require('discord.js');
const { generateMockSentence } = require('../support/helpers.js');
const { haskellBuzzWords, connectors } = require('../support/object_list.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mock-haskell')
        .setDescription('Sends a string that mocks the Haskell "programming" language.'),
    async execute(interaction) {
        let message = generateMockSentence(haskellBuzzWords, connectors);
        await interaction.reply(message);
    },
};