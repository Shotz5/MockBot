"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockJoinVC = void 0;
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const enums_1 = require("../../utils/enums");
exports.MockJoinVC = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-join-vc')
        .setDescription('Tell the bot to join the voice channel')
        .addChannelOption(builder => builder.setName('channel')
        .setDescription('The channel to join')
        .setRequired(true)
        .addChannelTypes(discord_js_1.ChannelType.GuildVoice)),
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel', true);
        const connection = (0, voice_1.joinVoiceChannel)({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        let player = (0, voice_1.createAudioPlayer)();
        connection.subscribe(player);
        await interaction.reply(enums_1.MockResponses.JoinVC + channel.name);
    }
};
