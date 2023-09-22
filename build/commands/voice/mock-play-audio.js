"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPlayAudio = void 0;
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const play_dl_1 = __importDefault(require("play-dl"));
exports.MockPlayAudio = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-play-audio')
        .setDescription('Play a youtube video in a voice channel')
        .addStringOption(builder => builder.setName('url')
        .setDescription('The youtube video to play')
        .setRequired(true)),
    async execute(interaction) {
        let url = interaction.options.getString('url', true);
        if (!interaction.guildId) {
            await interaction.reply("Could not find guild the command was ran from.");
            return;
        }
        let validateUrl = await play_dl_1.default.validate(url);
        if (!validateUrl || validateUrl == "search") {
            await interaction.reply("URL provided is invalid");
            return;
        }
        let connection = (0, voice_1.getVoiceConnection)(interaction.guildId);
        if (!connection || connection.state.status != voice_1.VoiceConnectionStatus.Ready) {
            await interaction.reply("Not connected to a voice channel, run /mock-join-vc <channel> first.");
            return;
        }
        let stream = await play_dl_1.default.stream(url, {
            discordPlayerCompatibility: true,
        });
        let resource = (0, voice_1.createAudioResource)(stream.stream);
        let player = (0, voice_1.createAudioPlayer)();
        player.play(resource);
        connection.subscribe(player);
        await interaction.reply("Playing...");
    }
};
