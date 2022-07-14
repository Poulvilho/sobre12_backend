const nodemailer = require('nodemailer');
const process = require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.EMAIL,
    pass: process.PASSWORD,
  },
});

const sendEmail = (mailOptions) => {
  mailOptions.from = process.EMAIL;
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
};

module.exports = sendEmail;
