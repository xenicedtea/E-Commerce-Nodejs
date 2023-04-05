const express = require('express');
const router = express.Router();
const {newProduct,getAllProductsByCategory} = require('../controller/product.ctrl');
const {checkAuthorizationAdmin} = require('../middleware/auth.middleware')
let initProductRouter = (app) => {
    router.post('/product',checkAuthorizationAdmin, newProduct);
    app.use("/api/products",router);
}

module.exports = initProductRouter;