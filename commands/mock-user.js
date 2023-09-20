const { SlashCommandBuilder } = require('discord.js');
const { mock } = require('../support/helpers.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mock-user')
        .setDescription('Mocks the user tagged')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mock')
                .setRequired(true)
        ),
    async execute(interaction) {
        let user = interaction.options.getUser('user', true);
        let lastMessageContent = null;

        await interaction.channel.messages.fetch({ limit: 50 }).then(chatMsgs => {
            lastMessageContent = chatMsgs.filter(m => m.author === user).first().content;
        });

        if (!lastMessageContent) {
            await interaction.reply("User has not sent any messages recently");
        } else {
            await interaction.reply("<@" + user.id + ">\n\n" + mock(lastMessageContent));
        }
    },
};