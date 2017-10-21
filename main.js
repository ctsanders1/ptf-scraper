/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const MailManager = require('./utils/MailManager')
const BoardScraper = require('./scrapers/BoardScraper')
const NotificationManager = require('./utils/NotificationManager')
const config = require('./config/config')

const mailManager = new MailManager()
const boardNotificationManager = new NotificationManager(config.boardStoragePath, mailManager)
const boardScraper = new BoardScraper(config.boardUrl, boardNotificationManager, config.boardNotificationRecipients)
boardScraper.run()

