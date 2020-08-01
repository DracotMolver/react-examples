//requiring NPM modeles
// env variables
require("dotenv").config();

// -==============================
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = mongoose.connection;
const app = express();

db.on("error", console.error);

//requiring local modeles
const configs = require("./config");
const routes = require("./routes/routes");
const helperFunctions = require("./helpers/helperFunctions");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

mongoose.connect(`mongodb://${configs.dbHost}/${configs.dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
helperFunctions.populateDb();

routes(app);

app.use("/videos", express.static("videos"));
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Finally starting the listener
app.listen(configs.applicationPort, function () {
  console.log("NODE_ENV=" + process.env.NODE_ENV);
  console.log("Example app listening on port " + configs.applicationPort + "!");
});
