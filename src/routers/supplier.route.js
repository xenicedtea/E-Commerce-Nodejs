const express = require('express');
const router = express.Router();
const {newSupplier,updateSupplier} = require('../controller/supplier.ctrl');
const {checkAuthorizationAdmin} = require('../middleware/auth.middleware')
let initSupplierRouter = (app) => {
    router.post('/supplier',checkAuthorizationAdmin, newSupplier);
    // router.post('/supplier',checkAuthorizationAdmin, (req,res)=>{
    //     res.json({
    //         hello:"hello"
    //     })
    // });
    router.post('/update',checkAuthorizationAdmin, updateSupplier);
    app.use("/api/suppliers",router);
}

module.exports = initSupplierRouter;