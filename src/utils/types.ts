import { Client, Collection, ClientOptions, SlashCommandBuilder, ChatInputCommandInteraction, CacheType, EmbedBuilder, EmbedAssetData, EmbedAuthorData } from 'discord.js';
import { YouTubeChannel } from 'play-dl';

/**
 * Extension of DiscordJS client to add a commands attribute
 */
export class IClient extends Client {
    public commands: Collection<string, ISlashCommand>

    constructor(options: ClientOptions, commands: Collection<string, ISlashCommand>) {
        super(options);
        this.commands = commands;
    }
}

/**
 * Object to represent a "SlashCommand" in the common structure of the application
 * data - the actual slash command builder
 * execute - what happens when the command is ran
 */
export type ISlashCommand = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
    execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void>
}

/**
 * Data types for a simple info Embed panel
 */
interface IEmbedInfo {
    title?: string,
}

/**
 * Data types for a complex player info embed panel
 */
interface IEmbedPlayer extends IEmbedInfo {
    url: string,
    author?: YouTubeChannel,
    description?: string,
    image?: string,
    timestamp?: Date,
}

/**
 * Base class with desired values for all builders, has no constructor
 * cannot be accessed outside this class
 * 
 */
class IEmbedBuilder {
    public color = 0xFFFF00;

    /**
     * Function that converts IEmbedBuilders into EmbedBuilders
     * 
     * @returns EmbedBuilder
     */
    public toEmbedBuilder(): EmbedBuilder {
        let embed = new EmbedBuilder(this);
        return embed;
    }
}

/** 
 * Desired formatting and fallbacks for an "Info" embed
 */
export class IEmbedInfoBuilder extends IEmbedBuilder {
    public title: string;

    /**
     * Constructor to make an instance of an info embed
     * 
     * @param data IEmbedInfo object
     */
    constructor(data: IEmbedInfo | void) {
        super();
        this.title = data?.title ?? "No title provided"
    }
}

/**
 * Desired formatting and fallbacks for a "Player" embed
 */
export class IEmbedPlayingBuilder extends IEmbedInfoBuilder {
    public url: string;
    public author: EmbedAuthorData;
    public description: string;
    public image: EmbedAssetData;
    public timestamp: Date;

    /**
     * Constructor to make an instance of a "Player" embed
     * 
     * @param data IEmbedPlayer object
     */
    constructor(data: IEmbedPlayer | void) {
        super(data);
        this.url = data?.url ?? "https://www.youtube.com/";
        this.author = {
            name: data?.author?.name ?? "Unknown",
            url: data?.author?.url,
            iconURL: data?.author?.iconURL(),
        }
        this.description = data?.description ?? "No description available";
        this.image = {
            url: data?.image ?? "https://as2.ftcdn.net/v2/jpg/02/51/95/53/1000_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
        };
        this.timestamp = data?.timestamp ?? new Date();
    }
}