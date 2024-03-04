const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

module.exports = Cart;