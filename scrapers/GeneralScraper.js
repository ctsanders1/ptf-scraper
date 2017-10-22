/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const ScraperBase = require('./ScraperBase')
const MailManager = require('../utils/MailManager')
const config = require('../config/config')

class GeneralScraper extends ScraperBase {
    constructor ({ url, notificationManager, recipients, notificationType, notificationStorageKey }) {
        super(url)
        this.recipients = recipients
        this.notificationType = notificationType
        this.notificationStorageKey = notificationStorageKey
        this.notificationManager = notificationManager
    }

    _prepareMailOptions ({ subject, link, createdBy, publishedAt }) {
        return MailManager.composeMail({
            from: '"PTF OS" <danijel.vincijanovic@gmail.com>',
            to: this.recipients,
            subject: `PTF ${this.notificationType} - ${subject}`,
            text: `
                ${subject}
                ${createdBy}
                ${publishedAt}
                Link: ${config.baseUrl}${link}
            `,
            html: `
                <h3>${subject}</h3>
                <p>
                    ${createdBy}<br/>
                    ${publishedAt}
                </p>
                <a href="${config.baseUrl}${link}">Pogledaj obavijest</a>
            `
        })
    }

    _processPage ($) {
        const notificationElem = $('.blog .items-row').first()
        const anchor = notificationElem.find('h2 a')
        const subject = anchor.text().trim()
        const link = anchor.attr('href')
        const createdBy = notificationElem.find('.createdby').text().trim()
        const publishedAt = notificationElem.find('.published').text().trim()
        const notification = { subject, link, createdBy, publishedAt }

        const mailOptions = this._prepareMailOptions(notification)
        this.notificationManager.handleNotification(notification, mailOptions, this.notificationStorageKey)
    }

    run () {
        this.preparePage()
            .then(($) => this._processPage($))
    }
}

module.exports = GeneralScraper