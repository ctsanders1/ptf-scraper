/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const axios = require('axios')
const cheerio = require('cheerio')

class ScraperBase {
    /**
     * ScraperBase
     * @param {String} url
     * @param {Function} processPage
     */
    constructor (url) {
        this.url = url
    }

    /**
     * Load up cheerio with html
     * @param {String} html
     * @return {Object}
     * @private
     */
    _loadCheerio (html) {
        return cheerio.load(html)
    }

    /**
     * Get page for scrapping
     * @return {Promise}
     * @private
     */
    _getPage () {
        return axios.get(this.url)
            .then((response) => response.data)
    }

    /**
     * Prepare page for handling with cheerio
     * @return {Promise.<Object>}
     */
    preparePage () {
        return this._getPage()
            .then((page) => this._loadCheerio(page))
            .catch((error) => console.log(error))
    }
}

module.exports = ScraperBase;