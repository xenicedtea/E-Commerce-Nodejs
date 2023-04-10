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

let getAllInBoundCompleted = async(req, res, next) => {
    const inboundResult = await inventoryService.getAllInBoundCompleted();
    res.json({
        success:true,
        data: {
            inbound:inboundResult
        }
    })
}

let getAllInBoundPending = async(req, res, next) => {
    const inboundResult = await inventoryService.getAllInBoundPending();
    res.json({
        success:true,
        data: {
            inbound:inboundResult
        }
    })
}

let getAllInBoundProcessing = async(req, res, next) => {
    const inboundResult = await inventoryService.getAllInBoundProcessing();
    res.json({
        success:true,
        data: {
            inbound:inboundResult
        }
    })
}

let getAllInBoundPaid = async(req, res, next) => {
    const inboundResult = await inventoryService.getAllInBoundPaid();
    res.json({
        success:true,
        data: {
            inbound:inboundResult
        }
    })
}

let getAllInBoundUnPaid = async(req, res, next) => {
    const inboundResult = await inventoryService.getAllInBoundUnPaid();
    res.json({
        success:true,
        data: {
            inbound:inboundResult
        }
    })
}

let getAllInBoundCancle = async(req, res, next) => {
    const inboundResult = await inventoryService.getAllInBoundCancle();
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
    getAllInBoundCancle,
    getAllInBoundCompleted,
    getAllInBoundPending,
    getAllInBoundProcessing,
    getAllInBoundUnPaid,
    getAllInBoundPaid,
    outbound,
}