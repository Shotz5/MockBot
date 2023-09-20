const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { token } = require('../config.json');

const rest = new REST().setToken(token);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-global-commands')
        .setDescription('Delete all global application commands.'),
    async execute(interaction) {
        // If you're not Shotz, you can't do it, sorry :(
        if (interaction.user.id != '123673884099739649') {
            await interaction.reply({ content: 'Cannot execute this command if you are not Shotz', ephemeral: true });
        } else {
            await rest.put(Routes.applicationCommands(interaction.applicationId), { body: [] })
                .then(() => console.log('Deleted all global application commands'));
            await interaction.reply({ content: 'Deleted all global application commands', ephemeral: true });
        }
    },
};