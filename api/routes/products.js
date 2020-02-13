const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

//GET: ALL ORDRES
router.get('/', (req, res, next) => {
  Product.find()
    .select('name price')
    .sort({ _id: 1 })
    .then(docs => { 
      res.status(200).json({
        count:docs.length,
        data: docs.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + item._id
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

//POST: ADD ORDER
router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => { 
      res.status(200).json({
        msg: "post request for adding product",
        createProduct: result
      })
      })
    .catch(err => { 
      res.status(404).json(err)
    });

})

//GET: ORDER DETAIL
router.get('/:prodid', (req, res, next) => {
  const id = req.params.prodid;
  Product.findById(id)
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else { 
        res.status(404).json({
          msg: "Entered wrong Product ID",
          code:res.statusCode
        })
      }
    })
    .catch(err => { 
      res.status(500).json({
        msg:'Invalid Product ID',
        code:res.statusCode
      })
    })
})

//PATCH: UPDATE ORDER
router.patch('/:prodid', (req, res, next) => {
  const id = req.params.prodid;
  let updatePro = {};
  for (const prod in req.body) {
    updatePro[prod] = req.body[prod];
  }
  Product.update({ _id: id }, { $set: updatePro })
    .then(result => { 
      res.status(200).json(result)
    })
    .catch(err => { 
      res.status(500).json({
        msg:'prodeuct not updated',
        code:res.statusCode
      })
    })
 })

 //DELETE: ORDER DELETE
router.delete('/:prodid', (req, res, next) => {
  const id = req.params.prodid;
  Product.findByIdAndRemove(id)
    .then(doc => {
      res.status(200).json({
        msg: 'Product deleted successfully'
      })
    })
    .catch()
  
})

module.exports = router;
