const express = require("express");
const { sendEmail, sendBasicEmail } = require("./index");

const app = express();

app.get("/send-newsletter-on-email", (req, res) => {
  sendEmail(
    "test@mailinator.com",
    "Welcome message",
    "Welcome message content"
  );
  res.send("send newsletter success");
});

app.get("/send-simple-mail", (req, res) => {
  sendBasicEmail(
    'elonmusk@tesla.com',
    'Design Your Model S | Tesla',
    'Plain text body'
  );
  res.send("send email success");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});