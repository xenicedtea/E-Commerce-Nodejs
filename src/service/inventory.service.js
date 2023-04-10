const db = require('../db/models/index');
const { sequelize } = require('sequelize');
//inbound
//Thêm phiếu nhập kho
let createInbound = async(supplierId, items) => {
    // tao inbound order
    const inboundOrder = await db.inbound_orders.create({
        supplierId: supplierId,
	    total: 0,
	    status: 0,
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

module.exports = {
    createInbound,
}

//outbound
//Thêm phiếu xuất kho

//inventory
//Thêm phiếu kiểm kho

//Thống kê báo cáo




