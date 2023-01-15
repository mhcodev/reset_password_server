const nodemailer = require('nodemailer');
const { mail } = require('../config/email.config');

const emailTransporter = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  tls: {
    rejectUnauthorized: false
  },
  secure: false,
  auth: {
    user: mail.user,
    pass: mail.pass
  }
});

const sendEmail = async (email, subject, html) => {
  await emailTransporter.sendMail({
    from: `MHCode <${ mail.user }>`,
    to: email,
    subject: subject,
    text: 'Hola amigos, suscríbance para más videos',
    html: html
  });
}

module.exports = {
  sendEmail
}