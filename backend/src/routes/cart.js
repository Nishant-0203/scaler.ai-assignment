const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartController');

router.get('/:sessionId', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/clear/:sessionId', clearCart);
router.delete('/:id', removeFromCart);

module.exports = router;
