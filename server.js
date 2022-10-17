const express = require("express");
const { sendEmail, sendEmail2 } = require("./index");

const app = express();

app.get("/send-email", (req, res) => {
  sendEmail(
    "test@mailinator.com",
    "Welcome message",
    "Welcome message content"
  );
  res.send("send email success");
});

app.get("/basic", (req, res) => {
  sendEmail2(
    'elonmusk@tesla.com',
    'Design Your Model S | Tesla',
    'Plain text body'
  );
  res.send("send email success");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});