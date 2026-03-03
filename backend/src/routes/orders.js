const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);

module.exports = router;
