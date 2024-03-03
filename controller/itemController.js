const Item = require("../models/itemModel");

const Joi = require("joi").extend(require("@joi/date"));

// Add Item
module.exports.addItem = async (req, res) => {

    const schema = Joi.object({
        itemName: Joi.string().required(),
        img: Joi.object().required(),
        price: Joi.string().required(),
        shopName: Joi.string().required(),
        farmerId: Joi.string().required(),
        availability: Joi.boolean().required(),
        itemType: Joi.string().required(),
        description: Joi.string().required(),
    });

    try {
        const { itemName, img, price, shopName, farmerId, availability, itemType, description } = req.body;
        const { error } = schema.validate({
            itemName, img, price, shopName, farmerId, availability, itemType, description
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const item = await Item.create({
                itemName, img, price, shopName, farmerId, availability, itemType, description
            });
            if (item) {
                console.log("Item Add Successfull");
                res.status(200).json({ message: "Item Add Successfull", item });
            } else {
                res.status(400).json({ message: "Unsuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}