const db = require('../db/models/index');
const {Op} = require ('sequelize')
const { sequelize } = require('sequelize');
//inbound
//Thêm phiếu nhập kho
let createInbound = async(supplierId, status, items) => {
    // tao inbound order
    const inboundOrder = await db.inbound_orders.create({
        supplierId: supplierId,
	    total: 0,
	    status: status,
    });


    // tao inbound order detail
    const inboundOrderItems = items.map(item => ({
        orderId: inboundOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice
    }));

    //create inbound oder items
    const addInboundOrderItems = await db.inbound_order_items.bulkCreate(inboundOrderItems);
    
    //change quantity product
    //get all inbound items
    const inboundItem = await db.inbound_order_items.findAll({
        where:{
            orderId: inboundOrder.id
        },raw:true
    });

    let total = 0;
    inboundItem.map(async(item)=>{
        //tinh tong tien 
        let mul = item.quantity * item.unitPrice;
        total += mul;

        //cap nhat so luong product
        await db.products.increment(
            'quantity',
            {
                by: item.quantity,
                where: {
                    id: item.productId,
                },
            }
        );

    })
    
    //cap nhat tong tien nhap 
    inboundOrder.update({total});

    return inboundOrder.id;
}

let getAllInBound = async() => {
    const allInBound = await db.inbound_orders.findAll({
        include: [{
            model: db.inbound_order_items,
            as: 'inbound_order_items',
        }],
    })
    return allInBound;
}

let getAllInBoundStatus = async(status) => {
    const allInBound = await db.inbound_orders.findAll({
        include: [{
            model: db.inbound_order_items,
            as: 'inbound_order_items',
        }],
        where:{
            status:{
                [Op.eq]:status
            }
        }
    })
    return allInBound;
}

let addCartItem = async(userId,productId,quantity) => {
    let cartOnl;
    //check cart status = 1
    cartOnl = await db.cart.findOne({
        where:{
            status:{
                [Op.eq]: 0
            }
        }, raw:true
    })
    //neu không có thì tạo cart trước
    if (!cartOnl){
        cartOnl = await db.cart.create({
            userId: userId,
        })
    }
    //thêm sản phẩm vào cart
        //get product
    const product = await db.products.findOne({
            where:{
                id:{
                    [Op.eq]:productId
                }
            }
        })
    if(!product){
        throw new error("Product not found.")
    }
    
    const cartItem = await db.cart_item.create({
        productId:productId,
        cartId: cartOnl.id,
        sku: product.sku,
        price: product.price,
        discount: product.discount,
        quantity: quantity
    })
    return cartItem;
}


let getItemInCart = async(cartId) => {
    const cart = await db.cart.findOne({
        where:{
            id:{
                [Op.eq]:cartId
            },
            status:{
                [Op.eq]:0
            }
        },raw:true
    })

    if(!cart){
        throw new error("Cart not found or already paid");
    }

    const cartItem = await db.cart_item.findAll({
        where:{
            cartId:{
                [Op.eq]:cartId
            },
        }, raw: true
    })

    if(!cartItem){
        throw new error("Cart is empty")
    }

    return cartItem
}


let payCart = async(params) => {
    const cart = await db.cart.findOne({
        where:{
            id:{
                [Op.eq]:params.cartId
            },
            status:{
                [Op.ne]:1
            }
        },raw:true
    })

    if(!cart){
        throw new error("Cart not found");
    }
    else{
        console.log("huhuh",cart)
    }

    const cartUpdate = {
        status:1,
        name:params.name,
        mobile:params.mobile ,
        email:params.email,
        line1:params.line1,
        line2:params.line2,
        province:params.province,
        country:params.country,
        content:params.content
    }
    console.log(cartUpdate);

    const cartUpdateResult = await db.cart.update(
        cartUpdate,
        {
            where:{
                id:{
                    [Op.eq]:params.cartId
                }
            }, raw:true
        }
    )

    return cartUpdateResult
}
module.exports = {
    createInbound,
    getAllInBound,
    getAllInBoundStatus,
    addCartItem,
    getItemInCart,
    payCart
}
