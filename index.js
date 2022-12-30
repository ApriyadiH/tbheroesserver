// Import library
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Import file lain
const router = require("./api/"); 

// Declare Variable
const app = express();
const port = 3001;
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "https://tbheroesserver.vercel.app/",
    methods: ["GET", "POST"],
  },
});

// test API
app.get("/", (req, res) => {
  res.send("Testing tersambung ke server");
});

app.use("/", express.json(), router);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data)
  })





})




//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

server.listen(port, () => {
  console.log("Web Socket running on",port);
});



// app.listen(port, () => {
//   console.log(port, "Server is open with port!");
// });