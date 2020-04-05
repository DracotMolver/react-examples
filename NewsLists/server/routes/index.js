// Modules
const { Router } = require('express');
// Project
const paths = require('./paths');
const home = require('./home');
const news = require('./news');


function routes(app) {
    const router = Router();

    // app client
    home(app);

    // API - v1 (app/v1)
    app.use(paths.app.root, news(router));
}

module.exports = routes;
