const db = require('../db/models/index');
const {Op} = require('sequelize')
let newSupplier = async(supplier) => {
    console.log(supplier)
    const supplierResult = await db.supplier.create(supplier);
    return supplierResult;
}

let updateSupplier = async(supplier) => {
    //check exist
    const supplierExist = await db.supplier.findOne({
        where:{
            id:{
                [Op.eq]:supplier.id
            }
        }
    })

    if (!supplierExist){
        throw new Error('Supplier not found')
    }

    const supplierResult = await db.supplier.update(supplier,{
        where:{
            id:{
                [Op.eq]:supplier.id
            }
        }
    })

    return supplierResult;
}

module.exports = {
    newSupplier,
    updateSupplier,
}