const express = require('express');
const router = express.Router();
const {createInbound, outbound} = require('../controller/inventory.ctrl');
const {checkAuthorizationAdmin} = require('../middleware/auth.middleware')
let initInventoryRouter = (app) => {
    router.post('/inbound', checkAuthorizationAdmin, createInbound);
    // router.post('/update', checkAuthorizationAdmin,updateCategory);
    // router.get('/categories', checkAuthorizationAdmin, getAllCategory);
    // router.get('/categories-active', getAllCategoryActive);
    // router.get('/:categorySlug', getAllProductsByCategory);
    app.use("/api/inventory",router);
}

module.exports = initInventoryRouter;