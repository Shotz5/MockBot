"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var boolingTime;
(function (boolingTime) {
    boolingTime.data = new SlashCommandBuilder()
        .setName('booling-time')
        .setDescription("Let the lads know it's time for valo.");
    function execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = "<@225116928463601665> <@390285461651980298> <@158504048427925504> <@123673884099739649> <@195273555498237952>\n\nIt's valo time nerds.";
            yield interaction.reply(message);
        });
    }
    boolingTime.execute = execute;
})(boolingTime || (boolingTime = {}));
