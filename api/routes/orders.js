const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');
const orderController = require('../controllers/orders')
//GET: ALL ORDERRS
router.get('/', orderController.ordersList);

//POST: ADD ORDER TO MONGODB
router.post('/', checkAuth, orderController.addOrder)

//GET: ORDER DETAIL
router.get('/:orderid', checkAuth, orderController.orderDetail )

//PATCH: ORDER PRODUCT
router.patch('/:orderid', checkAuth, orderController.updateOrder )

//DELETE: ORDER DELETE
router.delete('/:orderid', checkAuth, orderController.deleteOrder )

module.exports = router;

