const { handleErrors } = require('../middleware/handleErrors');
const inventoryService = require('../service/inventory.service');

let createInbound =  async(req,res,next) => {
   try {
        const {supplierId, items} = req.body;
        const inboundResult = await inventoryService.createInbound(supplierId, items);
        res.json({
            success: true,
            data: {
                id:inboundResult
            }
        })
   } catch (error) {
        handleErrors(res,error);
   }
}

let outbound =  (req,res,next) => {

}

module.exports = {
    createInbound,
    outbound,
}