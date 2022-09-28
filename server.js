const express = require("express");
const { sendEmail } = require("./index");

const app = express();

app.get("/send-email", (req, res) => {
  sendEmail(
    "test@mailinator.com",
    "Welcome message",
    "Welcome message content"
  );
  res.send("send email success");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});