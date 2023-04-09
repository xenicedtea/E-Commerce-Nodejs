const { handleErrors } = require('../middleware/handleErrors');
const supplierService = require('../service/supplier.service');

let newSupplier = async(req,res,next) => {
    try {
        const {name, contact_name, email, phone, address, city, state, zip_code, country, active}= req.body;
        //check not null
        if(!name){
            throw new Error('Missing required field');
        }

        const supplier = {
            name:name,
            contact_name:contact_name,
            email:email,
            phone:phone,
            address:address,
            city:city,
            state:state,
            zip_code:zip_code,
            country:country,
            active:active,
        }

        const supplierResult = await supplierService.newSupplier(supplier);
        res.json({
            success:"success",
            data:{
                supplier: supplierResult
            }
        })
    } catch (error) {
        handleErrors(res,error);
    }
}

let updateSupplier = async(req,res,next) => {
    try {
        const {id, name, contact_name, email, phone, address, city, state, zip_code, country, active}= req.body;
        //check not null
        if(!name || !id){
            throw new Error('Missing required field');
        }

        const supplier = {
            id:id,
            name:name,
            contact_name:contact_name,
            email:email,
            phone:phone,
            address:address,
            city:city,
            state:state,
            zip_code:zip_code,
            country:country,
            active:active,
        }

        const supplierResult = await supplierService.updateSupplier(supplier);
        res.json({
            success:"success",
            data:{
                supplier: supplierResult
            }
        })
    } catch (error) {
        handleErrors(res,error);
    }
}

module.exports = {
    newSupplier,
    updateSupplier,
}