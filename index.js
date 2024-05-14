const nodemailer = require('nodemailer');
const ejs = require('ejs');
const multiparty = require("multiparty");
require('dotenv').config()

const obj = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
};

const obj2 = {
  "host": "127.0.0.1",
  "port": 1025,
  "secure": false,
  "auth": {
      "user": "test@protonmail.com",
      "pass": ""
  },
  "tls": {
      "rejectUnauthorized": false
  }
}
let transporter = nodemailer.createTransport(obj);

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const sendBasicEmail = (to, subject, content) => {
  const message = {
    from: 'elonmusk@tesla.com', // Sender address
    to,         // List of recipients
    subject , // Subject line
    text: content, 
  
    // to send HTML mail
    // html: '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>',
  
    // to send email with attachments
    // attachments: [
    //   { // Use a URL as an attachment
    //     filename: 'image.png',
    //     path: 'https://media.gettyimages.com/photos/view-of-tesla-model-s-in-barcelona-spain-on-september-10-2018-picture-id1032050330?s=2048x2048'
    //   }
    // ]
  
  };
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

const sendEmail = (receiver, subject, content) => {
  ejs.renderFile(__dirname + '/templates/welcome.ejs', { receiver, content }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: 'elonmusk@tesla.com',
        to: receiver,
        subject: subject,
        html: data
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    }
  });
};

const sendFormData = (req, res) =>{
    //1.
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
  
      //2. You can configure the object however you want
      const mail = {
        from: data.name,
        to: process.env.EMAIL,
        subject: data.subject,
        text: `${data.name} <${data.email}> \n${data.message}`,
      };
      console.log(mail, 'mail')
      //3.
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong.");
        } else {
          res.status(200).send("Email successfully sent to recipient!");
        }
      });
    });
}

module.exports = {
  sendEmail, sendBasicEmail, sendFormData
};