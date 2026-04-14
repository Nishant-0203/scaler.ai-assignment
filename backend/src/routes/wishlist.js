const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');

router.get('/:sessionId', getWishlist);
router.post('/', addToWishlist);
router.delete('/:id', removeFromWishlist);

module.exports = router;
