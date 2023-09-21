import { Collection, Events, GatewayIntentBits } from 'discord.js';
import { MyClient, MySlashCommand } from './utils/classes';
import { token } from './config/config.json';
import * as externCommands from './commands/index';

const commands = new Collection<string, MySlashCommand>();
// Import commands from files
Object.entries(externCommands).forEach(([key, command], index) => {
    commands.set(command.data.name, command);
});

const bot = new MyClient(
    {intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]},
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