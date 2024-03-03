const express = require("express");
const router = express.Router();

const { addItem, deleteItem, AllItems, ItemByFarmer , updateItem , getSelectetItems , getItemsBySearch } = require("../controller/itemController");

router.post("/addItem", addItem);
router.put("/updateItem", updateItem);
router.get("/AllItems", AllItems);
router.delete("/deleteItem/:id", deleteItem);
router.get("/itemsByFarmer/:farmerId", ItemByFarmer);
router.get("/getSelectetItems/:number", getSelectetItems);
router.get("/getItemBySearch/:search", getItemsBySearch);

module.exports = router;