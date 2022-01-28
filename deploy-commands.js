const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('./config.json')

const commands = [
    new SlashCommandBuilder()
        .setName('mock-text')
        .setDescription('Mocks the text passed into it')
        .addStringOption(option => 
            option.setName('text')
                .setDescription('The text to mock')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('mock-user')
        .setDescription('Mocks the user tagged')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mock')
                .setRequired(true)
        ),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error)