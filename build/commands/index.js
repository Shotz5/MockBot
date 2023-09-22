"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./delete-global-commands"), exports);
__exportStar(require("./delete-guild-commands"), exports);
__exportStar(require("./text/booling-time"), exports);
__exportStar(require("./text/mock-business"), exports);
__exportStar(require("./text/mock-crazy"), exports);
__exportStar(require("./text/mock-haskell"), exports);
__exportStar(require("./text/mock-reverse"), exports);
__exportStar(require("./text/mock-text"), exports);
__exportStar(require("./text/mock-user"), exports);
__exportStar(require("./text/mock-vertical"), exports);
__exportStar(require("./voice/mock-join-vc"), exports);
__exportStar(require("./voice/mock-leave-vc"), exports);
__exportStar(require("./voice/mock-audio-play"), exports);
__exportStar(require("./voice/mock-audio-pause"), exports);
__exportStar(require("./voice/mock-audio-stop"), exports);
__exportStar(require("./voice/mock-audio-unpause"), exports);
