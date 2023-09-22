"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockResponses = void 0;
var MockResponses;
(function (MockResponses) {
    MockResponses["JoinVC"] = "Joined voice channel: ";
    MockResponses["LeaveVC"] = "Destroyed connection to voice channel in guild.";
    MockResponses["GuildNotFound"] = "Could not find guild the command was ran from.";
    MockResponses["UrlInvalid"] = "URL provided is invalid.";
    MockResponses["NotConnected"] = "Not connected to a voice channel, run /mock-join-vc <channel> first.";
    MockResponses["Playing"] = "Playing...";
    MockResponses["Stopped"] = "Stopped playing.";
    MockResponses["Paused"] = "Paused...";
    MockResponses["AlreadyPlaying"] = "Already playing audio, wait for it to finish!";
    MockResponses["NotPlaying"] = "Bot does not currently have any audio playing.";
    MockResponses["NotPaused"] = "Bot does not currently have any audio paused.";
    MockResponses["SubscriptionError"] = "There was an error with this bots audio subscription.";
})(MockResponses || (exports.MockResponses = MockResponses = {}));
