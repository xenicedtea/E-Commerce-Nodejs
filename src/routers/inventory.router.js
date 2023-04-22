const express = require('express');
const router = express.Router();
const {
        createInbound, 
        outbound, 
        getAllInBound,
        getAllInBoundStatus,
        addCartItem,
        getItemInCart,
        payCart,
    } = require('../controller/inventory.ctrl');
const {checkAuthorizationAdmin,checkAuthorization} = require('../middleware/auth.middleware');

let initInventoryRouter = (app) => {
    router.post('/inbound', checkAuthorizationAdmin, createInbound);
    router.get('/inbound/:status', checkAuthorizationAdmin, getAllInBoundStatus);
    router.get('/inbound/:status', checkAuthorizationAdmin, getAllInBoundStatus);
    router.get('/inbound', checkAuthorizationAdmin, getAllInBound);

    router.post('/cart/add-item', checkAuthorization, addCartItem)
    // router.post('/cart/cart-item-pay', checkAuthorization, getItemInCart)
    router.get('/cart/cart-item-pay', checkAuthorization, getItemInCart)
    router.path('/cart/pay', checkAuthorization,payCart)
    app.use("/api/inventory",router);
}

module.exports = initInventoryRouter;