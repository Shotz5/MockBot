const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('./config.json')

const commands = [
    new SlashCommandBuilder()
        .setName('text-mock')
        .setDescription('Mocks the text passed into it')
        .addStringOption(option => 
            option.setName('text')
                .setDescription('The text to mock')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('user-mock')
        .setDescription('Mocks the user tagged')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mock')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('vertical-mock')
        .setDescription('Returns a string in vertical form')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The string to vertical-ize')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user')
            .setDescription('Target to a user')
            .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName('reverse-string')
        .setDescription('Sends the string back in reverse')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to reverse')
                .setRequired(true)
        ),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
//     .then(() => console.log("Successfully registered application commands."))
//     .catch(console.error)

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error)