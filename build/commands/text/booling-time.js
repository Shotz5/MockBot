"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoolingTime = void 0;
const discord_js_1 = require("discord.js");
exports.BoolingTime = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('booling-time')
        .setDescription("Let the lads know it's time for valo."),
    async execute(interaction) {
        let message = "<@225116928463601665> <@390285461651980298> <@158504048427925504> <@123673884099739649> <@195273555498237952>\n\nIt's valo time nerds.";
        await interaction.reply(message);
    }
};
