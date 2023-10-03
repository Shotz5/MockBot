import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder, ChannelType, VoiceChannel } from "discord.js";
import { joinVoiceChannel, createAudioPlayer } from '@discordjs/voice';
import { IEmbedInfoBuilder, ISlashCommand } from "../../utils/types";
import { MockResponses } from "../../utils/translations";

export const MockJoinVC: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-join-vc')
        .setDescription('Tell the bot to join the voice channel')
        .addChannelOption(builder => 
            builder.setName('channel')
                .setDescription('The channel to join')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
        ),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        let channel: VoiceChannel = interaction.options.getChannel('channel', true);

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        let player = createAudioPlayer();
        connection.subscribe(player);

        // On error, destroy the connection to preserve memory
        connection.on("error", (e) => {
            console.log(e);
            connection.destroy();
        });

        let embed = new IEmbedInfoBuilder({
            title: MockResponses.JoinVC + channel.name,
        });

        await interaction.reply({ embeds: [embed.toEmbedBuilder()] });
    }
}