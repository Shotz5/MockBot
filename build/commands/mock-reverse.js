"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockReverse = void 0;
const discord_js_1 = require("discord.js");
exports.MockReverse = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-reverse')
        .setDescription('Sends the string back in reverse')
        .addStringOption(option => option.setName('text')
        .setDescription('The text to reverse')
        .setRequired(true)),
    async execute(interaction) {
        let message = interaction.options.getString('text', true);
        let response = message.split('').reverse().join('');
        await interaction.reply(response);
    }
};
