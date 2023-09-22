"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCrazy = void 0;
const discord_js_1 = require("discord.js");
const functions_1 = require("../../utils/functions");
exports.MockCrazy = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-crazy')
        .setDescription('Crazy? I was crazy once.'),
    async execute(interaction) {
        let message = (0, functions_1.mock)('Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. And rats make me crazy.');
        await interaction.reply(message);
    }
};
