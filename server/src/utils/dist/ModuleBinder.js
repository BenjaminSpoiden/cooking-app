"use strict";
exports.__esModule = true;
var ioredis_1 = require("ioredis");
var cache = new ioredis_1["default"]();
module.exports = {
    set: cache.set.bind(cache),
    get: cache.get.bind(cache)
};
exports["default"] = cache;
