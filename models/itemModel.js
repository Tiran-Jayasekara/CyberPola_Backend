const mongoose = require("mongoose");

// This is Schema for news
const ItemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
        },
        img: {
            type: {
                img1: String,
                img2: String,
                img3: String,
            },
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        shopName: {
            type: String,
            required: true,
        },
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer'
        },
        availability: {
            type: Boolean,
            required: true,
        },
        itemType: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const Item = mongoose.model.Item || mongoose.model("Item", ItemSchema);

module.exports = Item;
