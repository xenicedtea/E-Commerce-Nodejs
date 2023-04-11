const express = require('express');
const router = express.Router();
const {
        createInbound, 
        outbound, 
        getAllInBound,
        getAllInBoundStatus,
    } = require('../controller/inventory.ctrl');
const {checkAuthorizationAdmin} = require('../middleware/auth.middleware');

let initInventoryRouter = (app) => {
    router.post('/inbound', checkAuthorizationAdmin, createInbound);
    router.get('/inbound/:status', checkAuthorizationAdmin, getAllInBoundStatus);
    router.get('/inbound', checkAuthorizationAdmin, getAllInBound);
    app.use("/api/inventory",router);
}

module.exports = initInventoryRouter;