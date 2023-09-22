import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder, ChannelType, VoiceChannel } from "discord.js";
import { joinVoiceChannel, createAudioPlayer } from '@discordjs/voice';
import { MySlashCommand } from "../../utils/classes";
import { MockResponses } from "../../utils/enums";

export const MockJoinVC: MySlashCommand = {
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

        await interaction.reply(MockResponses.JoinVC + channel.name);
    }
}