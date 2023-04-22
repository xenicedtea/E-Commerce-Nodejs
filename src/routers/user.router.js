const express = require('express');
const router = express.Router();
const {checkAuthorization,checkAuthorizationAdmin} = require('../middleware/auth.middleware')
const {changePassword} = require('../controller/user.ctrl')

let initUserRouters = (app) => {
    
    router.patch('/change/password',checkAuthorization,changePassword);
    app.use("/api/account",router);
}

module.exports = initUserRouters;