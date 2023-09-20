const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { token } = require('../config.json');

const rest = new REST().setToken(token);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-guild-commands')
        .setDescription('Delete all guild-based commands.'),
    async execute(interaction) {
        // If you're not Shotz, you can't do it, sorry :(
        if (interaction.user.id != '123673884099739649') {
            await interaction.reply({ content: 'Cannot execute this command if you are not Shotz', ephemeral: true });
        } else {
            await rest.put(Routes.applicationGuildCommands(interaction.applicationId, interaction.guildId), { body: [] })
                .then(() => console.log('Deleted all guild commands for ' + interaction.guild.name));
            await interaction.reply({ content: 'Deleted all guild commands for ' + interaction.guild.name, ephemeral: true });
        }
    },
};