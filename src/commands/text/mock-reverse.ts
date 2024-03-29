import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { ISlashCommand } from '../../utils/types';

export const MockReverse: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-reverse')
        .setDescription('Sends the string back in reverse')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to reverse')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let message = interaction.options.getString('text', true);
        let response = message.split('').reverse().join('');
        await interaction.reply(response);
    }
}