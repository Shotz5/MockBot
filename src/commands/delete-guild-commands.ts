import { REST, Routes, SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { token } from '../config/config.json';
import { MySlashCommand } from '../utils/classes';

const rest = new REST().setToken(token);

export const DeleteGuildCommands: MySlashCommand = {
    data: new SlashCommandBuilder()
        .setName('delete-guild-commands')
        .setDescription('Delete all guild-based commands.'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        // If you're not Shotz, you can't do it, sorry :(
        if (interaction.user.id != '123673884099739649' || !interaction.guildId) {
            await interaction.reply({ content: 'Cannot execute this command if you are not Shotz', ephemeral: true });
        } else {
            await rest.put(Routes.applicationGuildCommands(interaction.applicationId, interaction.guildId), { body: [] })
                .then(() => {
                    if (!interaction.guild) {
                        console.error("No guild returned in interaction");
                        return;
                    }
                    console.log('Deleted all guild commands for ' + interaction.guild.name);
                    interaction.reply({ content: 'Deleted all guild commands for ' + interaction.guild.name, ephemeral: true });
                });
        }
    }
}