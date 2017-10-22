/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const StorageManager = require('./utils/StorageManager')
const MailManager = require('./utils/MailManager')
const GeneralScraper = require('./scrapers/GeneralScraper')
const NotificationManager = require('./utils/NotificationManager')
const config = require('./config/config')
const appStrings = require('./config/appStrings')
const appConstants = require('./config/appConstants')

const mailManager = new MailManager()
const storageManager = new StorageManager()
const boardNotificationManager = new NotificationManager(storageManager, mailManager)
const resultNotificationManager = new NotificationManager(storageManager, mailManager)

const boardScraper = new GeneralScraper({
    url: config.boardUrl,
    notificationManager: boardNotificationManager,
    notificationType: 'Oglasna ploča',
    notificationStorageKey: appConstants.redisKeys.BOARD_LAST_NOTIFICATION,
    recipients: config.boardNotificationRecipients
})

const resultScraper = new GeneralScraper({
    url: config.resultUrl,
    notificationManager: resultNotificationManager,
    notificationType: 'Rezultati',
    notificationStorageKey: appConstants.redisKeys.RESULT_LAST_NOTIFICATION,
    recipients: config.resultNotificationRecipients
})

function startScraper () {
    console.log(appStrings.startingScrapers)
    boardScraper.run()
    resultScraper.run()
    setTimeout(startScraper, 1000 * 60 * config.scraperInterval)
}

startScraper()