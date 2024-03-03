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

// Update item
module.exports.updateItem = async (req, res) => {

    const schema = Joi.object({
        _id: Joi.string().required(),
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
        const { _id, itemName, img, price, shopName, farmerId, availability, itemType, description } = req.body;
        const { error } = schema.validate({
            _id, itemName, img, price, shopName, farmerId, availability, itemType, description
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const item = await Item.findOneAndUpdate({ _id, _id }, {
                itemName, img, price, shopName, farmerId, availability, itemType, description
            });
            if (item) {
                console.log("Item update  Successfull");
                res.status(200).json({ message: "Item update Successfull", item });
            } else {
                res.status(400).json({ message: "Unsuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


//Get All Items
module.exports.AllItems = async (req, res) => {
    try {
        const allItems = await Item.find({});
        if (allItems.length > 0) {
            res.status(200).json({ message: "All Items", allItems });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Items" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Items By Farmer
module.exports.ItemByFarmer = async (req, res) => {
    try {
        const farmerId = req.params.farmerId;
        const ItemsByFarmer = await Item.find({ farmerId: farmerId });
        if (ItemsByFarmer.length > 0) {
            res.status(200).json({ message: "Items By Farmer", ItemsByFarmer });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Items by this Farmer" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete Items
module.exports.deleteItem = async (req, res) => {
    try {
        const ItemId = req.params.id;
        const deleteItem = await Item.findByIdAndDelete(ItemId);
        if (deleteItem) {
            res.status(200).json({ message: "Item Delete Success", deleteItem })
        } else {
            res.status(400).json({ message: "Couldnt find Item " });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
