// Modules
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
// Project
const hackerNewsService = require('./services/hacker_news');
const routes = require('./routes');
const dbConfig = require('./dbConfig');

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

routes(app);

mongoose.connect(
  `mongodb://${dbConfig.dbHost}/${dbConfig.dbName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// services
hackerNewsService();

const PORT = process.env.PORT || 3000;
const HOST = process.env.APP_HOST || '::';
app.listen(PORT, HOST, () => {
  console.log(`Enviroment: ${process.env.NODE_ENV}`);
  console.log(`Example app listening at http://${HOST}:${PORT}`);
});

module.exports = app;
