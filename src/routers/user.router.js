const express = require('express');
const router = express.Router();

const { getHello, getHi, createUser, getAllUser } = require('../controller/helloworld.controller');

let initUserRouters = (app) => {
    
    router.get('/hello',getHello);
    router.get('/hi',getHi);
    router.get('/get-all-user', getAllUser)
    router.post('/create-user',createUser)

    app.use("/hello",router);
}

module.exports = initUserRouters;