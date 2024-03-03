const mongoose = require("mongoose");

// This is schema for Admin
const FarmerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please Enter Your Name"],
        },
        lastName: {
            type: String,
            required: [true, "Please Enter Your Name"],
        },
        address: {
            type: String,
            required: true,
        },
        nic: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
        },
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, "Please Enter Password"],
        },
        shopName: {
            type: String,
            required: true,
        },
        shopImg: {
            type: String,
            required: true,
        },
        farmerImg: {
            type: String,
            required: true,
        },
        shopType: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Farmer = mongoose.model.Farmer || mongoose.model("Farmer", FarmerSchema);

module.exports = Farmer;
