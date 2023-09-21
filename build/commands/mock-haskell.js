"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockHaskell = void 0;
const discord_js_1 = require("discord.js");
const functions_1 = require("../utils/functions");
const arrays_1 = require("../utils/arrays");
exports.MockHaskell = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-haskell')
        .setDescription('Sends a string that mocks the Haskell "programming" language.'),
    async execute(interaction) {
        let message = (0, functions_1.generateMockSentence)(arrays_1.haskellBuzzWords, arrays_1.connectors);
        await interaction.reply(message);
    }
};
