/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const nodemailer = require('nodemailer')
const config = require('../config/config')

class MailManager {
    static composeMail ({ from, to, subject, text, html }) {
        return {
            from,
            to: to.toString(),
            subject,
            text,
            html
        }
    }

    sendMail (mailOptions) {
        let transporter = nodemailer.createTransport(config.smtp)
        transporter.sendMail(mailOptions, (error) => {
            if (error) return console.log(error)
            console.log('Message sent!')
        })
    }
}

module.exports = MailManager
