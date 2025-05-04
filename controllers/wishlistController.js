const Wishlist = require('../models/Wishlist');


exports.createWishlist = async (req, res) => {
    const { name, products } = req.body;

    try {
        const wishlist = await Wishlist.create({
            name,
            products, 
            createdBy: req.user.id,
        });
        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.find({ createdBy: req.user.id });
        res.status(200).json(wishlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateWishlist = async (req, res) => {
    const { id } = req.params;
    const { name, products } = req.body;

    try {
        const wishlist = await Wishlist.findById(id);
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        if (wishlist.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        
        wishlist.name = name || wishlist.name;
        wishlist.products = products || wishlist.products; 
        wishlist.updatedBy = req.user.id;

        const updatedWishlist = await wishlist.save();
        res.status(200).json(updatedWishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteWishlist = async (req, res) => {
    const { id } = req.params;

    try {
        const wishlist = await Wishlist.findById(id);
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        if (wishlist.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await wishlist.deleteOne();
        res.status(200).json({ message: 'Wishlist deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};