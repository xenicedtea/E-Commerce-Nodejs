const express = require('express');
const router = express.Router();

const {changePassword} = require('../controller/user.ctrl')

let initUserRouters = (app) => {
    
    router.post('/change/password',changePassword);
    app.use("/api/account",router);
}

module.exports = initUserRouters;