const express = require('express');
const router = express.Router();
const { createOrder, getOrder, getOrdersBySession, getOrdersByUser } = require('../controllers/orderController');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

router.post('/', authMiddleware, createOrder);
router.get('/session/:sessionId', getOrdersBySession);
router.get('/my-orders', authMiddleware, getOrdersByUser);
router.get('/:id', authMiddleware, getOrder);

module.exports = router;
