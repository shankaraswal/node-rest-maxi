const Order = require('../models/order');

//get controller for order list router
exports.ordersList = (req, res, next) => {
  Order.find()
    .select('prodid quantity _id orderDateTime')
    .populate('prodid', 'name price _id')
    .sort({ quantity: 1 })
    .then(items => { 
      res.status(200).json({
        count: items.length,
        data: items.map(item => ({
              orderId : item._id,
              orderQuantity : item.quantity,
              orderDate:item.orderDateTime,
              product: item.prodid,
              request : {
                type: "GET",
                url: "http://localhost:3000/orders/"+item._id
              }
          }))
        })
      })
    .catch(err => { 
    res.status(500).json({
      msg: 'Error found',
      code:res.statusCode
    })
    });
}

//post controller for add nwe order
exports. addOrder= (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    prodid: req.body.prodid,
    quantity: req.body.quantity,
    orderDateTime:new Date()
  });
  
  order
    .save()
    .then(result => { 
      res.status(200).json({
        data:result
      })
    })
    .catch(err => { 
      res.status(500).json({
        error:err
      })
    });
 
}

//get controller for order detail 
exports.orderDetail = (req, res, next) => {
  const id = req.params.orderid;
  Order.findById(id)
    .populate('prodid')
    .then(order => { 
      res.status(200).json({
        orderDetail: order,
        request : {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      })  
    })
    .catch()
}

//patch controller for update order
exports.updateOrder= (req, res, next) => {
  res.status(200).json({
    newmsg: 'order updated successfully'
  })
}

//delete controller for delete order
exports.deleteOrder = (req, res, next) => {
  res.status(200).json({
    newmsg: 'order deleted successfully'
  })
}