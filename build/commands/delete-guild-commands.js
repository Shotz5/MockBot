"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGuildCommands = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = require("../config/config.json");
const rest = new discord_js_1.REST().setToken(config_json_1.token);
exports.DeleteGuildCommands = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('delete-guild-commands')
        .setDescription('Delete all guild-based commands.'),
    async execute(interaction) {
        // If you're not Shotz, you can't do it, sorry :(
        if (interaction.user.id != '123673884099739649' || !interaction.guildId) {
            await interaction.reply({ content: 'Cannot execute this command if you are not Shotz', ephemeral: true });
        }
        else {
            await rest.put(discord_js_1.Routes.applicationGuildCommands(interaction.applicationId, interaction.guildId), { body: [] })
                .then(() => {
                if (!interaction.guild) {
                    console.error("No guild returned in interaction");
                    return;
                }
                console.log('Deleted all guild commands for ' + interaction.guild.name);
                interaction.reply({ content: 'Deleted all guild commands for ' + interaction.guild.name, ephemeral: true });
            });
        }
    }
};
