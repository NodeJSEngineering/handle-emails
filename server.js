const express = require("express");
const { sendEmail, sendBasicEmail, sendFormData } = require("./index");
require('dotenv').config()

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
    'sunny.gp07@gmail.com',
    'Design Your Model S | Tesla',
    'Plain text body'
  );
  res.send("send email success");
});

app.post("/send", (req, res) => {
  sendFormData(req, res)
});

//make the contact page the t4he first page on the app
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

//port will be 3000 for testing
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});