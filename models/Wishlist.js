const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        products: [
            {
                name: { type: String, required: true },
                description: { type: String },
                price: { type: Number, required: true },
                image: { type: String }, 
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);