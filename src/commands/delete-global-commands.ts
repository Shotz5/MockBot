import { REST, Routes, SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { token } from '../config.json';
import { ISlashCommand } from '../utils/types';

const rest = new REST().setToken(token);

export const DeleteGlobalCommands: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('delete-global-commands')
        .setDescription('Delete all global application commands.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        // If you're not Shotz, you can't do it, sorry :(
        if (interaction.user.id != '123673884099739649') {
            await interaction.reply({ content: 'Cannot execute this command if you are not Shotz' });
        } else {
            await rest.put(Routes.applicationCommands(interaction.applicationId), { body: [] })
                .then(() => console.log('Deleted all global application commands'));
            await interaction.reply({ content: 'Deleted all global application commands' });
        }
    }
}