const Product = require('../models/product');

//get controller for products list
exports.productList = (req, res, next) => {
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
}

//post controller for add product
exports.addProduct = (req, res, next) => {
  console.log(req.file);
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
}

//get controller for product detail
exports.productDetail = (req, res, next) => {
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
}

//update controller for product detail
exports.updateProduct =  (req, res, next) => {
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
}
 
//delte controller for product delete
exports.deleteProduct =(req, res, next) => {
  const id = req.params.prodid;
  Product.findByIdAndRemove(id)
    .then(doc => {
      res.status(200).json({
        msg: 'Product deleted successfully'
      })
    })
    .catch()
}
