"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const cache = new ioredis_1.default();
module.exports = {
    set: cache.set.bind(cache),
    get: cache.get.bind(cache)
};
exports.default = cache;
//# sourceMappingURL=ModuleBinder.js.map