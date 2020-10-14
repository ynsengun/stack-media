const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");

// routers
const ping = require("./routes/ping.js");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());

app.use("/ping", ping);

app.use((req, res, next) => {
  res.send("404");
});

module.exports = app;
