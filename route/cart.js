const express = require("express");
const router = express.Router();

const { addItemToCart, getAllCartItemsByUser } = require("../controller/cartController");

router.post("/addItemToCart", addItemToCart);
// router.put("/updateItem", updateItem);
// router.get("/AllItems", AllItems);
// router.delete("/deleteItem/:id", deleteItem);
router.get("/getAllCartItemsByUser/:userId", getAllCartItemsByUser);
// router.get("/getSelectetItems/:number", getSelectetItems);
// router.get("/getItemBySearch/:search", getItemsBySearch);

module.exports = router;