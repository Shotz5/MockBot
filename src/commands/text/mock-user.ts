import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, Message } from 'discord.js';
import { mock } from '../../utils/mock-factory';
import { ISlashCommand } from '../../utils/types';

export const MockUser: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-user')
        .setDescription('Mocks the user tagged')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mock')
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let user = interaction.options.getUser('user', true);
        let lastMessageContent: Message<boolean> | undefined;

        if (!interaction.channel) {
            console.error("Interaction channel wasn't found");
            return;
        }

        await interaction.channel.messages.fetch({ limit: 50 }).then(chatMsgs => {
            lastMessageContent = chatMsgs.filter(m => m.author === user).first();
        });

        if (!lastMessageContent) {
            await interaction.reply("User has not sent any messages recently");
        } else {
            await interaction.reply("<@" + user.id + ">\n\n" + mock(lastMessageContent.content));
        }
    }
}