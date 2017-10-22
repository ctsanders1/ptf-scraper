/**
 * Created by Danijel Vincijanović on 22/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const redis = require('redis')
const config = require('../config/config')

class StorageManager {
    constructor () {
        this.redisClient = redis.createClient({ url: config.redisUrl })
        this.redisClient.on('error', (error) => console.log(error))
    }

    set (key, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.set(key, JSON.stringify(value), (error, reply) => {
                if (error) reject(error)
                else resolve()
            })
        })
    }

    get (key) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, (error, value) => {
                if (error) reject(error)
                else resolve(JSON.parse(value))
            })
        })
    }
}

module.exports = StorageManager