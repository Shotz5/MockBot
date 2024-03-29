import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { ISlashCommand } from '../../utils/types';

export const MockVertical: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-vertical')
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
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let message = interaction.options.getString('text', true);
        let user = interaction.options.getUser('user');

        let response = message.split('').join('\n');
        await interaction.reply((user ? "<@" + user.id + ">\n\n" : "") + response);
    }
}