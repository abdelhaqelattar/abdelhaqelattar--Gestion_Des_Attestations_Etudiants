const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: "oussamaelnegraz@gmail.com",
    pass: "Negraz@2002",
  },
});

const mailBody = {
  from: "oussamaelnegraz@gmail.com",
  to: "elattarabdelhak0@gmail.com",
  subject: "Sample email sent using nodemailer",
  html: "<h1>Hello World!</h1>",
  attachments: [
        {
            filename: 'sample_attachment.txt',
            path: __dirname + '/post.txt',
        }
    ]
};

smtpTransport.sendMail(mailBody, function (error, info) {
    if (error) {
        console.log(error);
    }
    console.log("Email with attachment delivered successfully")
});