import { Collection, Events, GatewayIntentBits } from 'discord.js';
import { IClient, ISlashCommand } from './utils/types';
import { token } from './config.json';
import * as externCommands from './commands/index';

const commands = new Collection<string, ISlashCommand>();
// Import commands from files
Object.entries(externCommands).forEach(([key, command], index) => {
    commands.set(command.data.name, command);
});

const bot = new IClient(
    {intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]},
    commands,
);

// Once we're logged into the bot, confirm with command
bot.once(Events.ClientReady, client => {
    if (!client.user) {
        console.error("Unable to log in.");
        return;
    }
    console.log(`Logged in as ${client.user.tag}!`);
});

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
});

bot.login(token);