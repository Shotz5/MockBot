const { SlashCommandBuilder } = require('discord.js');
const { generateMockSentence } = require('../support/helpers.js');
const { stupidBusinessBuzzwords, connectors } = require('../support/object_list.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mock-business')
        .setDescription('Sends a string that mocks the dum business majors.'),
    async execute(interaction) {
        let message = generateMockSentence(stupidBusinessBuzzwords, connectors);
        await interaction.reply(message);
    },
};