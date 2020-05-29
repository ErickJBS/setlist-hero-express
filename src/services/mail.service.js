const nodemailer = require('nodemailer')
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        this.sender = `Setlist Hero <${process.env.EMAIL_USER}>`;
    }

    async readHTMLTemplate(path) {
        try {
            const content = fs.readFileSync(path, { encoding: 'utf-8' });
            return content;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }   

    async sendMail({ receiver, subject, body, isHTML }) {
        const mailOptions = {
            from: this.sender,
            to: receiver,
            subject
        }

        if (isHTML) {
            mailOptions.html = body;
        } else {
            mailOptions.text = body;
        }

        return this.transporter.sendMail(mailOptions);
    }

    async sendBandInvitation (email, { manager, band, role }) {
        const uri = path.join(__dirname, '../templates/band_invitation.html');
        const html = await this.readHTMLTemplate(uri);
        const template = handlebars.compile(html);
        var replacements = {
            manager, band, role, url: `${process.env.SERVER_URL}/register`
        };
        var htmlToSend = template(replacements);

        return this.sendMail({
            receiver: email,
            subject: 'New Band invitation',
            body: htmlToSend,
            isHTML: true
        });
    }

    async sendEventInvitation (email, { manager, band, event, date }) {
        const uri = path.join(__dirname, '../templates/event_invitation.html');
        const html = await this.readHTMLTemplate(uri);
        const template = handlebars.compile(html);
        var replacements = {
            manager, band, event, date, url: `${process.env.SERVER_URL}/register`
        };
        var htmlToSend = template(replacements);

        return this.sendMail({
            receiver: email,
            subject: 'New Event invitation',
            body: htmlToSend,
            isHTML: true
        });
    }
}

module.exports = new MailService();