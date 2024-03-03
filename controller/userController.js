const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');


// Add New User
module.exports.addUser = async (req, res) => {
    const schema = Joi.object({
        firstName: Joi.string().max(30).required(),
        lastName: Joi.string().required(),
        address: Joi.object().required(),
        mobile: Joi.number().required(),
        email: Joi.string().required(),
        town: Joi.string().required(),
        province: Joi.string().required(),
        zipCode: Joi.string().required(),
        password: Joi.string().required(),
    });

    try {
        const { firstName, lastName, address, mobile, email, town, province, zipCode, password } = req.body;
        const { error } = schema.validate({
            firstName, lastName, address, mobile, email, town, province, zipCode, password
        });
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            const UserIsAlreadyExist = await User.findOne({ email });
            if (UserIsAlreadyExist) {
                res.status(200).json({ message: "This User is Already Exist !" });
            } else {

                const hash = await bcrypt.hash(password, 10);
                const user = await User.create({
                    firstName, lastName, address, mobile, email, town, province, zipCode, password: hash
                });

                if (user) {
                    console.log("User Add Successfull");
                    res.status(200).json({ message: "User Add Successfull", user });
                } else {
                    res.status(400).json({ message: "Unsuccess" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



//User Login
module.exports.UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            const match = await bcrypt.compare(password, checkUser.password);
            if (match) {
                const token = jwt.sign(
                    {
                        id: checkUser._id,
                        email: checkUser?.email,
                    },
                    "default_secret_key",
                    { expiresIn: "1d" }
                );

                res.status(200).json({ message: "Login Success", checkUser, token });
            } else {
                res.status(200).json({ message: "Password Is Wrong" });
            }
        } else {
            res.status(200).json({ message: "Email Not Register" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

