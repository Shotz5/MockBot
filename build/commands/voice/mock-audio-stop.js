"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAudioStop = void 0;
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const enums_1 = require("../../utils/enums");
exports.MockAudioStop = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-audio-stop')
        .setDescription('Stop the bot from playing audio in this guild'),
    async execute(interaction) {
        if (!interaction.guildId) {
            await interaction.reply(enums_1.MockResponses.GuildNotFound);
            return;
        }
        let connection = (0, voice_1.getVoiceConnection)(interaction.guildId);
        if (!connection || connection.state.status != voice_1.VoiceConnectionStatus.Ready) {
            await interaction.reply(enums_1.MockResponses.NotConnected);
            return;
        }
        if (!connection.state.subscription) {
            await interaction.reply(enums_1.MockResponses.SubscriptionError);
            return;
        }
        if (connection.state.subscription.player.state.status == voice_1.AudioPlayerStatus.Idle) {
            await interaction.reply(enums_1.MockResponses.NotPlaying);
            return;
        }
        connection.state.subscription.player.stop();
        await interaction.reply(enums_1.MockResponses.Stopped);
    }
};
