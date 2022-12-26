const express = require("express");
const app = express();
const port = 3001;
const router = require("./api/"); 

// API untuk mengetes server
app.get("/", (req, res) => {
  res.send("Testing tersambung ke server");
});

app.use("/", express.json(), router);

app.listen(port, () => {
  console.log(port, "Server is open with port!");
});