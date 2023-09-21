"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUser = void 0;
const discord_js_1 = require("discord.js");
const functions_1 = require("../utils/functions");
exports.MockUser = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('mock-user')
        .setDescription('Mocks the user tagged')
        .addUserOption(option => option.setName('user')
        .setDescription('The user to mock')
        .setRequired(true)),
    async execute(interaction) {
        let user = interaction.options.getUser('user', true);
        let lastMessageContent;
        if (!interaction.channel) {
            console.error("Interaction channel wasn't found");
            return;
        }
        await interaction.channel.messages.fetch({ limit: 50 }).then(chatMsgs => {
            lastMessageContent = chatMsgs.filter(m => m.author === user).first();
        });
        if (!lastMessageContent) {
            await interaction.reply("User has not sent any messages recently");
        }
        else {
            await interaction.reply("<@" + user.id + ">\n\n" + (0, functions_1.mock)(lastMessageContent.content));
        }
    }
};
