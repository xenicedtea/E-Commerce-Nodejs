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

let getAllInBoundCompleted = async() => {
    const allInBound = await db.inbound_orders.findAll({
        include: [{
            model: db.inbound_order_items,
            as: 'inbound_order_items',
        }],
        where:{
            status:{
                [Op.eq]:0
            }
        }
    })
    return allInBound;
}

let getAllInBoundPending = async() => {
    const allInBound = await db.inbound_orders.findAll({
        include: [{
            model: db.inbound_order_items,
            as: 'inbound_order_items',
        }],
        where:{
            status:{
                [Op.eq]:1
            }
        }
    })
    return allInBound;
}

let getAllInBoundProcessing = async() => {
    const allInBound = await db.inbound_orders.findAll({
        include: [{
            model: db.inbound_order_items,
            as: 'inbound_order_items',
        }],
        where:{
            status:{
                [Op.eq]:2
            }
        }
    })
    return allInBound;
}

let getAllInBoundUnPaid = async() => {
    const allInBound = await db.inbound_orders.findAll({
        include: [{
            model: db.inbound_order_items,
            as: 'inbound_order_items',
        }],
        where:{
            status:{
                [Op.eq]:3
            }
        }
    })
    return allInBound;
}

let getAllInBoundPaid = async() => {
    const allInBound = await db.inbound_orders.findAll({
        include: [{
            model: db.inbound_order_items,
            as: 'inbound_order_items',
        }],
        where:{
            status:{
                [Op.eq]:4
            }
        }
    })
    return allInBound;
}

let getAllInBoundCancle = async() => {
    const allInBound = await db.inbound_orders.findAll({
        include: [{
            model: db.inbound_order_items,
            as: 'inbound_order_items',
        }],
        where:{
            status:{
                [Op.eq]:5
            }
        }
    })
    return allInBound;
}

module.exports = {
    createInbound,
    getAllInBound,
    getAllInBoundCompleted,
    getAllInBoundCancle,
    getAllInBoundCompleted,
    getAllInBoundPending,
    getAllInBoundProcessing,
    getAllInBoundUnPaid,
    getAllInBoundPaid,
}
