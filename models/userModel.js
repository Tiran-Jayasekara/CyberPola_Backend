const mongoose = require("mongoose");

// This is schema for Admin
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please Enter Your First Name"],
        },
        lastName: {
            type: String,
            required: [true, "Please Enter Your last Name"],
        },
        mobile: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
        },
        address: {
            type: {
                line1: String,
                line2: String,
            },
            required: true,
        },
        town: {
            type: String,
            required: true,
        },

        province: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model.User || mongoose.model("User", userSchema);

module.exports = User;
