"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config/config.json");
const externCommands = require("./commands/index");
const commands = [];
// Import commands from files
Object.entries(externCommands).forEach(([key, command], index) => {
    commands.push(command.data.toJSON());
});
// Construct and prepare an instance of the REST module
const rest = new discord_js_1.REST().setToken(config_json_1.token);
// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(discord_js_1.Routes.applicationGuildCommands(config_json_1.clientId, config_json_1.guildId), { body: commands });
        if (!data) {
            console.error("API Call failed, commands not deployed.");
            return;
        }
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
