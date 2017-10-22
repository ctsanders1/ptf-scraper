/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const appStrings = require('../config/appStrings')

class NotificationManager {
    constructor (storageManager, mailManagement) {
        this.storageManager = storageManager;
        this.mailManagement = mailManagement
    }

    _sendNotification (mailOptions) {
        console.log(appStrings.sendingMail)
        this.mailManagement.sendMail(mailOptions)
    }

    _saveNotification (notification, notificationStorageKey) {
        this.storageManager.set(notificationStorageKey, notification)
            .catch((error) => console.log(error))
    }

    handleNotification (notification, mailOptions, notificationStorageKey) {
        console.log(`Processing: ${notificationStorageKey}`)
        this.storageManager.get(notificationStorageKey)
            .then((lastNotification) => {
                if (lastNotification) {
                    if (JSON.stringify(notification) !== JSON.stringify(lastNotification)) {
                        console.log(appStrings.newNotification)
                        this._saveNotification(notification, notificationStorageKey)
                        this._sendNotification(mailOptions)
                    } else {
                        console.log(`${appStrings.noNotifications} for ${notificationStorageKey}`);
                    }
                } else {
                    console.log(`${appStrings.noNotifications} for ${notificationStorageKey}`);
                    console.log(appStrings.initializingStorage)
                    this._saveNotification(notification, notificationStorageKey)
                }
            })
            .catch((error) => console.log(error))
    }
}

module.exports = NotificationManager
