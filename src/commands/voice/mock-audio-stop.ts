import { ChatInputCommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import { getVoiceConnection, VoiceConnectionStatus, AudioPlayerStatus } from '@discordjs/voice';
import { MySlashCommand } from "../../utils/classes";
import { MockResponses } from "../../utils/enums";

export const MockAudioStop: MySlashCommand = {
    data: new SlashCommandBuilder()
        .setName('mock-audio-stop')
        .setDescription('Stop the bot from playing audio in this guild'),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        if (!interaction.guildId) {
            await interaction.reply(MockResponses.GuildNotFound);
            return;
        }

        let connection = getVoiceConnection(interaction.guildId);
        if (!connection || connection.state.status != VoiceConnectionStatus.Ready) {
            await interaction.reply(MockResponses.NotConnected);
            return;
        }

        if (!connection.state.subscription) {
            await interaction.reply(MockResponses.SubscriptionError);
            return;
        }

        if (connection.state.subscription.player.state.status == AudioPlayerStatus.Idle) {
            await interaction.reply(MockResponses.NotPlaying);
            return;
        }

        connection.state.subscription.player.stop();

        await interaction.reply(MockResponses.Stopped);
    }
}