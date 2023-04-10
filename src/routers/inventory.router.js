const express = require('express');
const router = express.Router();
const {
        createInbound, 
        outbound, 
        getAllInBound,
        getAllInBoundCancle,
        getAllInBoundCompleted,
        getAllInBoundPending,
        getAllInBoundProcessing,
        getAllInBoundUnPaid,
        getAllInBoundPaid
    } = require('../controller/inventory.ctrl');
const {checkAuthorizationAdmin} = require('../middleware/auth.middleware');

let initInventoryRouter = (app) => {
    router.post('/inbound', checkAuthorizationAdmin, createInbound);
    router.get('/inbound', checkAuthorizationAdmin, getAllInBound);
    router.get('/inbound-cplt', checkAuthorizationAdmin, getAllInBoundCompleted);
    router.get('/inbound-pending', checkAuthorizationAdmin, getAllInBoundPending);
    router.get('/inbound-processing', checkAuthorizationAdmin, getAllInBoundProcessing);
    router.get('/inbound-unpaid', checkAuthorizationAdmin, getAllInBoundUnPaid);
    router.get('/inbound-paid', checkAuthorizationAdmin, getAllInBoundPaid);
    router.get('/inbound-cancle', checkAuthorizationAdmin, getAllInBoundCancle);
    app.use("/api/inventory",router);
}

module.exports = initInventoryRouter;