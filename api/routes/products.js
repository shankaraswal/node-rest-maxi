const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/auth');
const productController = require('../controllers/products');

//storage locally on "uploads" folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) { 
    cb(null, file.originalname)
  }
});

const upload = multer({storage:storage});

//GET: ALL PRODUCTS
router.get('/', checkAuth, productController.productList);

//POST: ADD PRODUCT
router.post('/', upload.single('productImage'), checkAuth, productController.addProduct)

//GET: PRODUCT DETAIL
router.get('/:prodid', checkAuth, productController.productDetail);


//PATCH: UPDATE PRODUCT
router.patch('/:prodid', checkAuth, productController.updateProduct)

 //DELETE: PRODUCT DELETE
router.delete('/:prodid', checkAuth, productController.deleteProduct)

//exporting module
module.exports = router;
