/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const path = require('path')
const appConstants = require('./appConstants')

if (process.env.NODE_ENV !== appConstants.env.PRODUCTION) {
    require('dotenv').config({ path: path.join(__dirname, '../', 'env', `env.${process.env.NODE_ENV}`)})
}

const storageDir = path.join(__dirname, '../', 'storage')
const baseUrl = 'http://www.ptfos.unios.hr'

module.exports = {
    baseUrl,
    boardUrl: `${baseUrl}/index.php/oglasna-ploa`,
    resultUrl: `${baseUrl}/index.php/rezultati-ispita-i-kolokvija`,
    boardStoragePath: path.join(storageDir, 'board-notifications.txt'),
    resultStoragePath: path.join(storageDir, 'result-notifications.txt'),
    boardNotificationRecipients: JSON.parse(process.env.BOARD_NOTIFICATION_RECIPIENTS),
    resultNotificationRecipients: JSON.parse(process.env.RESULT_NOTIFICATION_RECIPIENTS),
    scraperInterval: Number(process.env.SCRAPER_INTERVAL_IN_MINUTES),
    smtp: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASSWORD
        }
    }
}