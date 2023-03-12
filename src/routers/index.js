const express = require('express');
const router = express.Router();

const initUserRoutes = require('./user.router');

let initWebRouters = (app) => {
    initUserRoutes(app);
    return app.use("/",router);
}

module.exports = initWebRouters;