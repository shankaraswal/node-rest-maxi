const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

//GET: ALL PRODUCTS
router.get('/', (req, res, next) => {
  Order.find()
    .select('prodid quantity')
    .populate('product')
    .sort({ quantity: 1 })
    .then(items => { 
      res.status(200).json({
        conut: items.length,
        data: items.map(item => ({
              id : item._id,
              quantity : item.quantity,
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
});

//POST: ADD PRODUCT TO MONGODB
router.post('/', (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    prodid: req.body.prodid,
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
 
})

//GET: PRODUCT DETAIL
router.get('/:prodid', (req, res, next) => {
  const id = req.params.prodid;
  if (id === 'new') {
    res.status(200).json({
      newmsg: 'get call: for # NEW # order',
      id:id
    })
  } else { 
    res.status(200).json({
      newmsg: 'get call: for # ANY # order',
      id:id
    })
  }
})

//PATCH: UPDATED PRODUCT
router.patch('/:prodid', (req, res, next) => {
    res.status(200).json({
      newmsg: 'order updated successfully'
    })
})

//DELETE: PRODUCT DELETE
router.delete('/:prodid', (req, res, next) => {
  res.status(200).json({
    newmsg: 'order deleted successfully'
  })
})


module.exports = router;

