const express = require("express");
const router = express.Router();

const { addItem, deleteItem, AllItems, ItemByFarmer , updateItem } = require("../controller/itemController");

router.post("/addItem", addItem);
router.put("/updateItem", updateItem);
router.get("/AllItems", AllItems);
router.delete("/deleteItem/:id", deleteItem);
router.get("/itemsByFarmer/:farmerId", ItemByFarmer);

module.exports = router;