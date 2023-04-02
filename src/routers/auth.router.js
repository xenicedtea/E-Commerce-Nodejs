const express = require('express');
const router = express.Router();
const {checkAuthorization} = require('../middleware/auth.middleware')
const {register,login,refreshAccessToken} = require('../controller/auth.ctrl');
let initAuthRouters = (app) => {
    router.post('/register',register);
    router.post('/login',login);
    router.post('/refresh-token',refreshAccessToken);
    app.use("/api/auth",router);
}

module.exports = initAuthRouters;