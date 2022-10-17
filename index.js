const nodemailer = require('nodemailer');
const ejs = require('ejs');

let transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '7bcebff80e28c0',
    pass: 'fc874983821f43'
  }
});

const sendEmail2 = (to, subject, content) => {
  const message = {
    from: 'elonmusk@tesla.com', // Sender address
    to,         // List of recipients
    subject , // Subject line
    text: content, 
  
    // to send HTML mail
    // html: '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>',
  
    // to send mail with attachments
    // attachments: [
    //   { // Use a URL as an attachment
    //     filename: 'your-testla.png',
    //     path: 'https://media.gettyimages.com/photos/view-of-tesla-model-s-in-barcelona-spain-on-september-10-2018-picture-id1032050330?s=2048x2048'
    //   }
    // ]
  };
  transport.sendMail(message, (error, info) => {
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

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    }
  });
};

module.exports = {
  sendEmail, sendEmail2
};