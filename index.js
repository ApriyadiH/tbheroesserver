// Import library
const express = require("express");
const cors = require("cors");

// Import file lain
const router = require("./api/"); 

// Declare Variable
const app = express();
const port = 3001;

app.use(cors());

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1532965",
  key: "fbaea5207fa7923cfdce",
  secret: "cc25a0d6352d576642c1",
  cluster: "ap1",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

app.get("/alert", (req, res) => {
  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
  });
  
  res.send("Kirim Pesan");
});



// const io = new Server(server, {
//   cors: {
//     origin: "https://tbheroes-ahegarto-gmailcom.vercel.app/",
//     methods: ["GET", "POST"],
//   },
// });

// test API
app.get("/", (req, res) => {
  res.send("Testing tersambung ke server");
});

app.use("/", express.json(), router);

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("send_message", (data) => {
//     socket.broadcast.emit("receive_message", data)
//   })

// })




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

app.listen(port, () => {
  console.log("Web Socket running on",port);
});



// app.listen(port, () => {
//   console.log(port, "Server is open with port!");
// });