const inventoryService = require('../service/inventory.service');

let inbound =  async(req,res,next) => {
   try {
        const {supplierId, items} = req.body;
        const inboundResult = await inventoryService.inbound.create(supplierId, items);
        res.json({
            success: true,
            data: {
                id:inboundResult.id
            }
        })
   } catch (error) {
    
   }
}

let outbound =  (req,res,next) => {

}

module.exports = {
    inbound,
    outbound,
}