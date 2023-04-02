const express = require('express');
const router = express.Router();

const initAuthRouters = require('./auth.router');
const initUserRouters = require('./user.router');


let initWebRouters = (app) => {
    initAuthRouters(app);
    initUserRouters(app);
    return app.use("/",router);
}

module.exports = initWebRouters;