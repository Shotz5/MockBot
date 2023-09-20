const { SlashCommandBuilder } = require('discord.js');
const helpers = require('../support/helpers.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mock-text')
        .setDescription('Mocks the text passed into it.')
        .addStringOption(option => 
            option.setName('text')
                .setDescription('The text to mock')
                .setRequired(true)
        ),
    async execute(interaction) {
        let mockSentence = helpers.mock(interaction.options.getString('text', true));
        await interaction.reply(mockSentence);
    },
};