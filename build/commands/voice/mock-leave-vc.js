"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockLeaveVC = void 0;
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const enums_1 = require("../../utils/enums");
exports.MockLeaveVC = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-leave-vc')
        .setDescription('Tell the bot to leave the voice channel'),
    async execute(interaction) {
        if (!interaction.guildId) {
            await interaction.reply(enums_1.MockResponses.GuildNotFound);
            return;
        }
        let connection = (0, voice_1.getVoiceConnection)(interaction.guildId);
        if (!connection) {
            await interaction.reply(enums_1.MockResponses.NotConnected);
            return;
        }
        connection.destroy();
        await interaction.reply(enums_1.MockResponses.LeaveVC);
    }
};
