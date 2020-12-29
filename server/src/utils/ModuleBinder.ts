import Redis from "ioredis"

const cache = new Redis()

module.exports = {
    set: cache.set.bind(cache),
    get: cache.get.bind(cache)
}

export default cache