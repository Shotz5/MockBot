const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('booling-time')
        .setDescription("Let the lads know it's time for valo."),
    async execute(interaction) {
        let message = "<@225116928463601665> <@390285461651980298> <@158504048427925504> <@123673884099739649> <@195273555498237952>\n\nIt's valo time nerds.";
        await interaction.reply(message);
    },
};