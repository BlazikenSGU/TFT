import express from 'express'
import Order from '../models/orderModel.js';

const orderRouter = express.Router();


//create order
orderRouter.post('/', async(req, res)=>{

    const newOrder = new Order({

        orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        subTotal: req.body.subTotal,
        cod: req.body.cod,
        total: req.body.total,

    });
    const order = await newOrder.save();
    res.status(201).send({message: 'tao don hang thanh cong', order});
});


//get all order id 
orderRouter.get('/all', async(req, res) =>{
    const orders = await Order.find();
    res.send(orders);
});

//get order mine
orderRouter.get('/mine/:id', async(req,res) =>{

    const orders = await Order.find({userId: req.params.id});
    res.send(orders);
});

//get one order
orderRouter.get('/find/:id', async(req,res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: 'order not found'});
    }
});

//count sum product
orderRouter.get('/countSumTotal', async(req,res) =>{
    try{
        const countSumTotal = await Order.aggregate([{$group: 
            {_id: null,
                total:  {$sum: '$total'}}}
            ]);
        res.status(200).json(countSumTotal);
        
    }catch(err){
        console.log(err.message);
    }
});





export default orderRouter;