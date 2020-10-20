const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const voteRoutes = require("./api/routes/votes");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/votes", voteRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use((req, res, next) => {
  const error = new Error("No encontrado");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = app;
