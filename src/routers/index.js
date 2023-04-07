const express = require('express');
const router = express.Router();

const initAuthRouters = require('./auth.router');
const initUserRouters = require('./user.router');
const initProductRouter = require('./product.router');
const initCategoryRouter = require('./category.router');

let initWebRouters = (app) => {
    initAuthRouters(app);
    initUserRouters(app);
    initProductRouter(app);
    initCategoryRouter(app);
    return app.use("/",router);
}

module.exports = initWebRouters;