"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockText = void 0;
const discord_js_1 = require("discord.js");
const helpers = require("../utils/functions");
exports.MockText = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-text')
        .setDescription('Mocks the text passed into it.')
        .addStringOption(option => option.setName('text')
        .setDescription('The text to mock')
        .setRequired(true)),
    async execute(interaction) {
        let mockSentence = helpers.mock(interaction.options.getString('text', true));
        await interaction.reply(mockSentence);
    }
};
