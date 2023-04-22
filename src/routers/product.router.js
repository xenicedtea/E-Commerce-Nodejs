const express = require('express');
const router = express.Router();
const {newProduct,updateProduct} = require('../controller/product.ctrl');
const {checkAuthorizationAdmin} = require('../middleware/auth.middleware')
let initProductRouter = (app) => {
    router.post('/product',checkAuthorizationAdmin, newProduct);
    router.patch('/update',checkAuthorizationAdmin, updateProduct);
    app.use("/api/products",router);
}

module.exports = initProductRouter;