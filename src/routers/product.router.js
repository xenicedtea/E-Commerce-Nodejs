const express = require('express');
const router = express.Router();
const {newProduct,updateProduct,getAllProductsByCategory,getAllProducts} = require('../controller/product.ctrl');
const {checkAuthorizationAdmin} = require('../middleware/auth.middleware')
const initProductRouter = (app) => {
    router.get('/product',checkAuthorizationAdmin, newProduct);
    router.post('/product',checkAuthorizationAdmin, newProduct);
    router.patch('/update',checkAuthorizationAdmin, updateProduct);
    router.get('/:categorySlug', getAllProductsByCategory);
    router.get('/', getAllProducts);
    app.use("/api/products",router);
}

module.exports = initProductRouter;