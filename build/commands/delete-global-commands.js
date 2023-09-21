"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGlobalCommands = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = require("../config/config.json");
const rest = new discord_js_1.REST().setToken(config_json_1.token);
exports.DeleteGlobalCommands = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('delete-global-commands')
        .setDescription('Delete all global application commands.'),
    async execute(interaction) {
        // If you're not Shotz, you can't do it, sorry :(
        if (interaction.user.id != '123673884099739649') {
            await interaction.reply({ content: 'Cannot execute this command if you are not Shotz', ephemeral: true });
        }
        else {
            await rest.put(discord_js_1.Routes.applicationCommands(interaction.applicationId), { body: [] })
                .then(() => console.log('Deleted all global application commands'));
            await interaction.reply({ content: 'Deleted all global application commands', ephemeral: true });
        }
    }
};
