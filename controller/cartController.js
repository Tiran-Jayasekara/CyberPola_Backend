const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cartModel");


// Add Item To Cart
module.exports.addItemToCart = async (req, res) => {
    const schema = Joi.object({
        itemId: Joi.string().required(),
        userId: Joi.string().required(),
        quantity: Joi.number().required(),
    });

    try {
        const { itemId, userId, quantity } = req.body;
        const { error } = schema.validate({
            itemId, userId, quantity
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            const existingCartItem = await Cart.findOne({ itemId, userId });

            if (existingCartItem) {
                console.log("Item already exists in the cart");
                res.status(200).json({ message: "Item already exists in the cart" });
            } else {
                const item = await Cart.create({
                    itemId, userId, quantity
                });
                if (item) {
                    console.log("Iten Added to Cart Successfull");
                    res.status(200).json({ message: "Item Added to Cart Successfull", item });
                } else {
                    res.status(400).json({ message: "Unsuccess" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Get All Cart Items By User
module.exports.getAllCartItemsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const allItems = await Cart.find({ userId: userId }).populate("itemId");
        if (allItems.length > 0) {
            res.status(200).json({ message: "All Items by User", allItems });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Items" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete Item From Cart
module.exports.DeleteItemFromCart = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const deleteItem = await Cart.findByIdAndDelete(itemId);
        if (deleteItem) {
            res.status(200).json({ message: "Item Remove from Cart", deleteItem });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Items" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}