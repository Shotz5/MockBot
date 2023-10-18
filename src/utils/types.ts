import { AudioPlayer, AudioPlayerStatus, AudioResource, CreateAudioPlayerOptions } from '@discordjs/voice';
import { Client, Collection, ClientOptions, SlashCommandBuilder, ChatInputCommandInteraction, CacheType, EmbedBuilder, EmbedAssetData, EmbedAuthorData, embedLength, Embed } from 'discord.js';
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
interface MessageType {
    title?: string,
}

/**
 * Data types for a complex player info embed panel
 */
interface ResourceMetaType extends MessageType {
    url: string,
    author?: YouTubeChannel,
    description?: string,
    image?: string,
    timestamp?: Date,
}

interface MyEmbedBuilder {
    toEmbedBuilder(): EmbedBuilder
}

/**
 * Base class with desired values for all builders, has no constructor
 * cannot be accessed outside this class
 * 
 */
class InfoBase {
    public color = 0xFFFF00;
}

/** 
 * Desired formatting and fallbacks for an "Info" embed
 */
export class InfoMetadata extends InfoBase {
    public title: string;

    /**
     * Constructor to make an instance of an info
     * 
     * @param data IEmbedInfo object
     */
    constructor(data: MessageType | void) {
        super();
        this.title = data?.title ?? "No title provided"
    }
}

/**
 * Desired formatting and fallbacks for a "Player" embed
 */
export class ResourceMetadata extends InfoMetadata {
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
    constructor(data: ResourceMetaType | void) {
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

export class InfoEmbedBuilder implements MyEmbedBuilder {
    public info: InfoMetadata;

    constructor(title?: string) {
        this.info = new InfoMetadata({
            title: title ?? "No title provided",
        });
    }

    /**
     * Function that converts IEmbedBuilders into EmbedBuilders
     * 
     * @returns EmbedBuilder
     */
    public toEmbedBuilder(): EmbedBuilder {
        let embed = new EmbedBuilder(this.info);
        return embed;
    }

    /**
     * Update the title
     */
    public setTitle(title: string) {
        this.info.title = title;
    }
}

export class PlayingEmbedBuilder implements MyEmbedBuilder {
    public content: ResourceMetadata;
    public nowPlaying: ResourceMetadata | undefined;
    public upNext: ResourceMetadata | undefined;

    constructor(content: ResourceMetadata, nowPlaying?: ResourceMetadata, upNext?: ResourceMetadata) {
        this.content = content;
        this.nowPlaying = nowPlaying;
        this.upNext = upNext;
    }

    /**
     * Function that returns a DiscordJS EmbedBuild
     * 
     * @returns EmbedBuilder
     */
    public toEmbedBuilder(): EmbedBuilder {
        let embed = new EmbedBuilder(this.content);

        if (this.nowPlaying) {
            embed.addFields({
                name: 'Now Playing',
                value: this.nowPlaying.title
            });
        }

        if (this.upNext) {
            embed.addFields({
                name: 'Up Next',
                value: this.upNext.title
            });
        }

        return embed;
    }
}

/**
 * Extension of AudioPlayer that adds a queue
 */
export class IAudioPlayer extends AudioPlayer {
    private queue: AudioResource[] = [];
    private queueMetaData: ResourceMetadata[] = [];
    private nowPlaying: AudioResource | undefined;
    private nowPlayingMeta: ResourceMetadata | undefined;

    constructor(options?: CreateAudioPlayerOptions, queue?: AudioResource[]) {
        super(options);
        this.queue = queue ?? [];

        this.on("stateChange", (oldState, newState) => {
            // If current song is done playing and there is a next in queue
            if (oldState.status === AudioPlayerStatus.Playing && newState.status === AudioPlayerStatus.Idle) {
                this.play();
            }
        });
    }

    /**
     * Add a new resource to the queue
     */
    public enqueue(resource: AudioResource, resourceMetaData: ResourceMetadata): PlayingEmbedBuilder {
        this.queue.push(resource);
        this.queueMetaData.push(resourceMetaData);
        const embed = new PlayingEmbedBuilder(resourceMetaData, this.nowPlayingMeta, this.queueMetaData.at(0));
        return embed;
    }

    /**
     * Skip the currently playing resource to the next resource
     * 
     * @returns Queue metaData
     */
    public skip(): PlayingEmbedBuilder | false {
        this.nowPlaying = this.queue.shift();
        this.nowPlayingMeta = this.queueMetaData.shift();
        if (!this.nowPlaying || !this.nowPlayingMeta) {
            return false;
        }
        const embed = new PlayingEmbedBuilder(this.nowPlayingMeta, this.nowPlayingMeta, this.queueMetaData.at(0));
        super.stop();
        super.play(this.nowPlaying);
        return embed;
    }

    /**
     * Play the next resource in the queue
     * 
     * @returns Queue metaData
     */
    public play(): PlayingEmbedBuilder | false {
        this.nowPlaying = this.queue.shift();
        this.nowPlayingMeta = this.queueMetaData.shift();
        if (!this.nowPlaying || !this.nowPlayingMeta) {
            return false;
        }
        const embed = new PlayingEmbedBuilder(this.nowPlayingMeta, this.nowPlayingMeta, this.queueMetaData.at(0));
        super.play(this.nowPlaying);
        return embed;
    }

    /**
     * Stop playing (clear the queue and stop)
     */
    public stop(): boolean {
        this.queue = [];
        this.queueMetaData = [];
        this.nowPlaying = undefined;
        this.nowPlayingMeta = undefined;
        return super.stop();
    }
}

export function createAudioPlayer(options?: CreateAudioPlayerOptions, queue?: Array<AudioResource>): IAudioPlayer {
    const audioPlayer = new IAudioPlayer(options, queue);
    return audioPlayer
}