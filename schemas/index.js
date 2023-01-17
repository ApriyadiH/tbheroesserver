const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose
  .connect("mongodb+srv://"+ process.env.CONNECTION +"@cluster0.chzg4j4.mongodb.net/tbheroes?retryWrites=true&w=majority")
  .catch(err => console.log(err))
};
mongoose.set('strictQuery', true)

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;