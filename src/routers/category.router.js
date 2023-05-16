const express = require('express');
const router = express.Router();
const {newCategory, updateCategory, getAllCategoryActive, getAllCategory} = require('../controller/category.ctrl');
const {checkAuthorizationAdmin} = require('../middleware/auth.middleware')
let initCategoryRouter = (app) => {
    router.post('/category', checkAuthorizationAdmin, newCategory);
    router.patch('/update', checkAuthorizationAdmin,updateCategory);
    router.get('/categories', checkAuthorizationAdmin, getAllCategory);
    router.get('/categories-active', getAllCategoryActive);
    
    app.use("/api/categories",router);
}

module.exports = initCategoryRouter;