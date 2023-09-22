import { Client, Collection, ClientOptions, SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';

export class MyClient extends Client {
    commands: Collection<string, ISlashCommand>

    constructor(options: ClientOptions, commands: Collection<string, ISlashCommand>) {
        super(options);
        this.commands = commands;
    }
}

export type ISlashCommand = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
}
