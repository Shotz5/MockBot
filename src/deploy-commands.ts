import { REST, Routes, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { clientId, guildId, token } from './config.json';
import * as externCommands from './commands/index';

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
// Import commands from files
Object.entries(externCommands).forEach(([key, command], index) => {
    commands.push(command.data.toJSON());
});

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data: any = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands }
		);

		if (!data) {
			console.error("API Call failed, commands not deployed.");
			return;
		}

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
