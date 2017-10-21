/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const fileManager = require('./FileManager')
const appStrings = require('../config/appStrings')

class NotificationManager {
    constructor (storageFilePath, mailManagement) {
        this.storageFilePath = storageFilePath
        this.mailManagement = mailManagement
        if (!fileManager.isCreated(storageFilePath)) {
            fileManager.createFile(storageFilePath)
        }
    }

    _sendNotification (mailOptions) {
        console.log(appStrings.sendingMail)
        this.mailManagement.sendMail(mailOptions)
    }

    handleNotification (notification, mailOptions) {
        const stringNotification = JSON.stringify(notification)
        fileManager.readFile(this.storageFilePath)
            .then((content) => {
                if (content.toString() !== stringNotification) {
                    this._sendNotification(mailOptions)
                    return fileManager.writeToFile(this.storageFilePath, stringNotification)
                } else {
                    console.log(appStrings.noNotifications);
                }
            })
            .catch((error) => console.log(error))
    }
}

module.exports = NotificationManager
