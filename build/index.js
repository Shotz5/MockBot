"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const classes_1 = require("./utils/classes");
const config_json_1 = require("./config/config.json");
const externCommands = require("./commands/index");
const commands = new discord_js_1.Collection();
// Import commands from files
Object.entries(externCommands).forEach(([key, command], index) => {
    commands.set(command.data.name, command);
});
const bot = new classes_1.MyClient({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent] }, commands);
// Once we're logged into the bot, confirm with command
bot.once(discord_js_1.Events.ClientReady, client => {
    if (!client.user) {
        console.error("Unable to log in.");
        return;
    }
    console.log(`Logged in as ${client.user.tag}!`);
});
bot.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = bot.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});
bot.login(config_json_1.token);
