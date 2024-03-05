const express = require("express");
const router = express.Router();

const { addItemToCart, getAllCartItemsByUser, DeleteItemFromCart } = require("../controller/cartController");

router.post("/addItemToCart", addItemToCart);
router.delete("/DeleteItemFromCart/:itemId", DeleteItemFromCart);
router.get("/getAllCartItemsByUser/:userId", getAllCartItemsByUser);


module.exports = router;