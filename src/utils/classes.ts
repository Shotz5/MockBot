import { Client, Collection, ClientOptions, SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';

export class MyClient extends Client {
    commands: Collection<string, MySlashCommand>

    constructor(options: ClientOptions, commands: Collection<string, MySlashCommand>) {
        super(options);
        this.commands = commands;
    }
}

export type MySlashCommand = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
}
