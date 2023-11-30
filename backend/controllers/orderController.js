const Order = require('../models/orderModel');

exports.addToOrder = async (req, res) =>{
    console.log("from orderController", req)
   
    const {orderId, userId,  items, totalAmount, orderDateTime, payment, status } = req.body; 
    const order = new Order(orderId, userId,  items, totalAmount, orderDateTime, payment, status); 

    try{
        await order.saveOrder(order);
        res.status(200).json({success:true, message: "Added to order"})

    }
    catch(err){
        console.error(err);
        res.status(500).json({success: "false", message: "server error"})
    }
}

exports.getAllOrders = async(req, res)=> {

    try{
        const orders = await Order.getAllOrders();
        if(!orders){
            return res.status(404).send({message: "No orders found"})
        }
        return res.status(200).send(orders)

    }
    catch(error){
        console.err(err);
        res.status(500).json({message:"server error"})
    }
}
exports.removeOrder = async (req, res)=>{
    
}

