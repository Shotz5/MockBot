"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAudioPlay = void 0;
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const enums_1 = require("../../utils/enums");
const play_dl_1 = __importDefault(require("play-dl"));
exports.MockAudioPlay = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-audio-play')
        .setDescription('Play audio in a voice channel from YouTube')
        .addStringOption(builder => builder.setName('url')
        .setDescription('The youtube audio to play')
        .setRequired(true)),
    async execute(interaction) {
        let url = interaction.options.getString('url', true);
        if (!interaction.guildId) {
            await interaction.reply(enums_1.MockResponses.GuildNotFound);
            return;
        }
        let validateUrl = await play_dl_1.default.validate(url);
        if (!validateUrl || validateUrl == "search") {
            await interaction.reply(enums_1.MockResponses.UrlInvalid);
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
        if (connection.state.subscription.player.state.status != voice_1.AudioPlayerStatus.Idle) {
            await interaction.reply(enums_1.MockResponses.AlreadyPlaying);
            return;
        }
        let stream = await play_dl_1.default.stream(url, {
            discordPlayerCompatibility: true,
        });
        let resource = (0, voice_1.createAudioResource)(stream.stream);
        connection.state.subscription.player.play(resource);
        await interaction.reply(enums_1.MockResponses.Playing);
    }
};
