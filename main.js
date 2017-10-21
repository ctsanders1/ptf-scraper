/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const MailManager = require('./utils/MailManager')
const GeneralScraper = require('./scrapers/GeneralScraper')
const NotificationManager = require('./utils/NotificationManager')
const config = require('./config/config')
const appStrings = require('./config/appStrings')

const mailManager = new MailManager()
const boardNotificationManager = new NotificationManager(config.boardStoragePath, mailManager)
const resultNotificationManager = new NotificationManager(config.resultStoragePath, mailManager)

const boardScraper = new GeneralScraper({
    url: config.boardUrl,
    notificationManager: boardNotificationManager,
    notificationType: 'Oglasna ploča',
    recipients: config.boardNotificationRecipients
})

const resultScraper = new GeneralScraper({
    url: config.resultUrl,
    notificationManager: resultNotificationManager,
    notificationType: 'Rezultati',
    recipients: config.resultNotificationRecipients
})

function startScraper () {
    console.log(appStrings.startingScrapers)
    boardScraper.run()
    resultScraper.run()
    setTimeout(startScraper, 1000 * 60 * config.scraperInterval)
}

startScraper()