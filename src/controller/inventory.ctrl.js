const { handleErrors } = require('../middleware/handleErrors');
const inventoryService = require('../service/inventory.service');

let createInbound =  async(req,res,next) => {
   try {
        const {supplierId, status, items} = req.body;
        const inboundResult = await inventoryService.createInbound(supplierId,status, items);
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

let getAllInBound = async(req, res, next) => {
    const inboundResult = await inventoryService.getAllInBound();
    res.json({
        success:true,
        data: {
            inbound:inboundResult
        }
    })
}
let getAllInBoundStatus = async(req, res, next) => {
    const {status} = req.params;
    const inboundResult = await inventoryService.getAllInBoundStatus(status);
    res.json({
        success:true,
        data: {
            inbound:inboundResult
        }
    })
}

let outbound =  (req,res,next) => {

}

module.exports = {
    createInbound,
    getAllInBound,
    getAllInBoundStatus,
   
    outbound,
}