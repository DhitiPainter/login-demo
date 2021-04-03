if (
  process.env.NODE_ENV !== "production" &&
  process.env.NODE_ENV !== "dev" &&
  process.env.NODE_ENV !== "staging"
) {
  require("dotenv").config();
}

const { MONGODB_URL } = process.env;

// configure mongo

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var compression = require("compression");
var morgan = require("morgan");

const routes = require("./routes");
mongoose.Promise = global.Promise;
const pathToBuild = "../client/";

function start() {
  var app = express();
  // HTTP request logger middleware
  app.use(morgan("dev"));

  app.enable("trust proxy");
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));
  app.use(bodyParser.json({ limit: "2mb" }));

  var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  };
  app.use(allowCrossDomain);

  // serve static assets normally
  app.use(express.static(pathToBuild, { etag: false }));

  app.use("/api/", routes);

  // fallback
  app.get("*", function (req, res) {
    console.log("CRAZY FUNCTION");
    console.log(pathToBuild);
    const file = path.resolve(pathToBuild, "public/index.html");
    console.log("FILE ", file);
    res.sendFile(file);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, function (err) {
    if (err) return console.error(err);
    console.log("\n | APP RUNNING ON PORT : %s\n", port);
  });
}

mongoose.connection
  .openUri(MONGODB_URL)
  .then(() => {
    mongoose.set("useFindAndModify", false);
    console.log("\n | CONNECTED TO MONGO URL : %s\n", MONGODB_URL);
    start();
  })
  .catch(err => {
    console.error("\n | APP STARTING ERROR : %s\n", err.message);
    process.exit(1);
  });
