"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClient = void 0;
const discord_js_1 = require("discord.js");
class MyClient extends discord_js_1.Client {
    constructor(options, commands) {
        super(options);
        this.commands = commands;
    }
}
exports.MyClient = MyClient;
