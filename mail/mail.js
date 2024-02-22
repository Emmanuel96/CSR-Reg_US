const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const sendMail = (html, subject, to_email) => {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(SENDGRID_API_KEY);
  const sendEmail = {
    to: to_email,
    from: "emmanuel@csr-accreditation.co.uk",
    subject: subject,
    html: html,
  };
  sgMail.send(sendEmail);
};

module.exports = {
  sendMail,
};
