const db = require('../db/models/index');
//inbound
//Thêm phiếu nhập kho
let inbound = async(supplierId, items) => {
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

    const addInboundOrderItems = await db.inbound_order_items.bulkCreate(inboundOrderItems);

    //tinh tong tien
    const total = await db.inbound_order_items.sum('quantity*unitPrice',{
        where:{
            orderId: inboundOrder.id
        }
    });

    inboundOrder.update({total});
    //return inbound order id
    return inboundOrder.id;
}

module.exports = {
    inbound,
}

//outbound
//Thêm phiếu xuất kho

//inventory
//Thêm phiếu kiểm kho

//Thống kê báo cáo




