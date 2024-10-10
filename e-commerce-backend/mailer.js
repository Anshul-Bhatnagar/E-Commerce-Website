const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS,
    },
});


const sendVerificationEmail = (to,token) =>{
    const verificationLink = 'http://localhost:5000/verify/${token}';
    const mailOption = {
        from:process.env.SMTP_USER,
        to:to,
        subject:'Email verification',
        text:`Please click the following link to verify your email: ${verificationLink}`,

    };

    return transporter.sendMail(mailOption);
};

module.exports = {
    sendVerificationEmail,
};