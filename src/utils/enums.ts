export enum MockResponses {
    JoinVC = "Joined voice channel: ",
    LeaveVC = "Destroyed connection to voice channel in guild.",
    GuildNotFound = "Could not find guild the command was ran from.",
    UrlInvalid = "URL provided is invalid.",
    NotConnected = "Not connected to a voice channel, run /mock-join-vc <channel> first.",
    Playing = "Playing...",
    Stopped = "Stopped playing.",
    Paused = "Paused...",
    AlreadyPlaying = "Already playing audio, wait for it to finish!",
    NotPlaying = "Bot does not currently have any audio playing.",
    NotPaused = "Bot does not currently have any audio paused.",
    SubscriptionError = "There was an error with this bots audio subscription.",
}