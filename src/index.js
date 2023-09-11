const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   console.log("HTTP Method - " + req.method + " , URL - " + req.url);
//   next();
// });

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("API for Notes");
});

// const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://alokkpsingh123:%40lokSingh123@cluster0.3ggp1uu.mongodb.net/notes_db?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started on port no. 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
