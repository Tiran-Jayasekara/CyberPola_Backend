const Farmer = require('../models/FarmerModel')
const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Item = require('../models/itemModel');


// Add Farmer
module.exports.addFarmer = async (req, res) => {
    const schema = Joi.object({
        firstName: Joi.string().max(30).required(),
        lastName: Joi.string().required(),
        address: Joi.string().min(5).required(),
        nic: Joi.string().required(),
        mobile: Joi.number().required(),
        email: Joi.string(),
        userName: Joi.string().required(),
        password: Joi.string().required(),
        shopName: Joi.string().required(),
        shopImg: Joi.string().required(),
        farmerImg: Joi.string().required(),
        shopType: Joi.string().required(),
        location: Joi.string().required(),
    });

    try {
        const { firstName, lastName, address, nic, mobile, email, userName, password, shopName, shopImg, farmerImg, shopType, location } = req.body;
        const { error } = schema.validate({
            firstName, lastName, address, nic, mobile, email, userName, password, shopName, shopImg, farmerImg, shopType, location
        });
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            const shopIsAlreadyExist = await Farmer.findOne({ shopName });
            if (shopIsAlreadyExist) {
                res.status(200).json({ message: "This shop is Already Exist !" });
            } else {

                const hash = await bcrypt.hash(password, 10);
                const farmer = await Farmer.create({
                    firstName, lastName, address, nic, mobile, email, userName, password: hash, shopName, shopImg, farmerImg, shopType, location
                });

                if (farmer) {
                    console.log("Farmer Add Successfull");
                    res.status(200).json({ message: "Farmer Add Successfull", farmer });
                } else {
                    res.status(400).json({ message: "Unsuccess" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get Farmer
module.exports.allFarmers = async (req, res) => {
    try {
        const allFarmersDetails = await Farmer.find({});
        if (allFarmersDetails.length > 0) {
            res.status(200).json({ message: "All Farmers", allFarmersDetails });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Farmers" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update Farmer Data
module.exports.updateFarmer = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        firstName: Joi.string().max(30).required(),
        lastName: Joi.string().required(),
        address: Joi.string().min(5).required(),
        nic: Joi.string().required(),
        mobile: Joi.number().required(),
        email: Joi.string(),
        shopType: Joi.string().required(),
        shopImg: Joi.string().required(),
        farmerImg: Joi.string().required(),
        location: Joi.string().required(),
    });

    try {
        const { _id, firstName, lastName, address, nic, mobile, email, shopType, shopImg, farmerImg, location } = req.body;
        const { error } = schema.validate({
            _id, firstName, lastName, address, nic, mobile, email, shopType, shopImg, farmerImg, location
        });
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            const updateFarmer = await Farmer.findOneAndUpdate({ _id, _id }, { firstName, lastName, address, nic, mobile, email, shopType, shopImg, farmerImg, location }, { new: true });
            if (updateFarmer) {
                res.status(200).json({ message: "Farmer Update Successfull", updateFarmer });
            } else {
                res.status(400).json({ message: "Farmer Update UnSuccessfull" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Delete Farmer
module.exports.deleteFarmer = async (req, res) => {
    try {
        const farmerId = req.params.farmerId;
        const deleteFarmer = await Farmer.findByIdAndDelete(farmerId);
        if (deleteFarmer) {
            res.status(200).json({ message: "Farmer Delete Success", deleteFarmer })
        } else {
            res.status(400).json({ message: "Couldnt find an Farmer " });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get Farmer With Items
module.exports.getFarmerWithItems = async (req, res) => {
    try {
        const farmerId = req.params.farmerId;

        const farmer = await Farmer.findById(farmerId);

        if (!farmer) {
            throw new Error('Farmer not found');
        }

        // Find all items belonging to the farmer
        const items = await Item.find({ farmerId: farmerId });

        // Return the farmer details along with the items
        res
            .status(200)
            .json({ message: "Farmer with Items", farmer, items });
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

//Farmer Login
module.exports.FarmerLogin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const checkFarmer = await Farmer.findOne({ userName });
        if (checkFarmer) {
            const match = await bcrypt.compare(password, checkFarmer.password);
            if (match) {
                const token = jwt.sign(
                    {
                        id: checkFarmer._id,
                        nic: checkFarmer?.nic,
                    },
                    "default_secret_key",
                    { expiresIn: "1d" }
                );

                res.status(200).json({ message: "Login Success", checkFarmer, token });
            } else {
                res.status(200).json({ message: "Password Is Wrong" });
            }
        } else {
            res.status(200).json({ message: "User Name Not Register" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


