const sgMail = require('@sendgrid/mail')
    // const logger = require('../utils/logger')
require("dotenv").config()

// Sendmail -  A function that helps send mail to users
// @email - email parameter for the receiver - string
// @message - message parameter to be sent to user - string
// @subject - subject parameter and additional part of the mail - string
// Return: sent if success or error if failed

exports.Sendmail = (email, message, subject) => {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
    sgMail.setApiKey(SENDGRID_API_KEY)
    const sendEmail = {
        to: email,
        from: 'emmanuel@csr-accreditation.co.uk',
        subject: subject,
        html: message
    }
    sgMail
        .send(sendEmail)
        .then(() => {
            console.log("sent");
        })
        .catch((error) => {
            console.log(error);
        });
}