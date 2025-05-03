const express = require('express');
const router = express.Router();
const {
    createWishlist,
    getWishlists,
    updateWishlist,
    deleteWishlist,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// Create a new wishlist
router.post('/', protect, createWishlist);

// Get all wishlists
router.get('/', protect, getWishlists);

// Update a wishlist
router.put('/:id', protect, updateWishlist);

// Delete a wishlist
router.delete('/:id', protect, deleteWishlist);

module.exports = router;