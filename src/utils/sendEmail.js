const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  let transport = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.FROM_USER,
      pass: process.env.FROM_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const message = {
    from: `${process.env.FROM_NAME}<${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  let info = await transport
    .sendMail(message)
    .then((res) => {
      console.log(`Email sent`);
    })
    .catch((err) => {
      console.log(`Error occured:`, err);
    });
};
