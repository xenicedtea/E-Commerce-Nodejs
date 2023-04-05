const express = require('express');
const router = express.Router();
const {newCategory, getAllProductsByCategory, getAllCategoryActive, getAllCategory} = require('../controller/category.ctrl');
const {checkAuthorizationAdmin} = require('../middleware/auth.middleware')
let initCategoryRouter = (app) => {
    router.post('/category', checkAuthorizationAdmin, newCategory);
    router.get('/categories', checkAuthorizationAdmin, getAllCategory);
    router.get('/categories-active', getAllCategoryActive);
    router.get('/:categorySlug', getAllProductsByCategory);
    app.use("/api/categories",router);
}

module.exports = initCategoryRouter;