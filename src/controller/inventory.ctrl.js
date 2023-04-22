const { handleErrors } = require('../middleware/handleErrors');
const inventoryService = require('../service/inventory.service');
const {getUserIdFromToken} = require('../util/getIdUserFromToken');

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

let addCartItem = async(req,res,next) => {
    try{
        const {productId, quantity} = req.body;
        let accessToken = req.headers.authorization
        accessToken = accessToken && accessToken.split(" ")[1]
        const userId = await getUserIdFromToken(accessToken);

        const result = await  inventoryService.addCartItem(userId,productId,quantity);
        res.json({
            data:result
        })
    } catch (error) {
        handleErrors(res,error);
    }
}

let getItemInCart = async(req,res,next) => {
    try{
        const {id} = req.body;
        const cartItem = await inventoryService.getItemInCart(id);
        let total = 0;
        let quantity = 0; 
        console.log(cartItem);
        cartItem.map((item) => {
            total += (item.quantity * item.price);
            quantity++;
        })

        res.json({
            total:total,
            quantity:quantity,
            data:cartItem,
        })
    } catch (error) {
        handleErrors(res,error);
    }

}

let payCart = async(req,res,next) => {
    try{
        const {cartId,name,mobile,email,line1,line2,province,country,content} = req.body;
        const params = {
            cartId,name,mobile,email,line1,line2,province,country,content
        }
        const result = await inventoryService.payCart(params)

    } catch (error) {
        handleErrors(res,error);
    }
}

module.exports = {
    createInbound,
    getAllInBound,
    getAllInBoundStatus,
    addCartItem,
    getItemInCart,
    payCart,
    outbound,

}