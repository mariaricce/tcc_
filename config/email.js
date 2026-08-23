const nodemailer = require('nodemailer');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS
    ? process.env.EMAIL_PASS.replace(/\s/g, '')
    : '';

const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: emailUser,
        pass: emailPass
    }
});

module.exports = transporter;