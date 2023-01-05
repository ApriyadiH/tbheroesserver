require("dotenv").config();
const express = require("express");
const lib = express.Router();
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: "ap1",
  useTLS: true
});

lib.get("/alert", (req, res) => {
  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
  })
  res.send("Kirim Pesan aa");
});

lib.get("/test/pusher", (req, res) => {
  res.send("Connected to lib pusher");
});

module.exports = lib;