const express = require("express");
const router = express.Router();

const { addFarmer, allFarmers, updateFarmer, deleteFarmer , getFarmerWithItems  , FarmerLogin} = require("../controller/FarmerController");

router.post("/addFarmer", addFarmer);
router.post("/FarmerLogin", FarmerLogin);
router.get("/allFarmers", allFarmers);
router.get("/FarmerWithItems/:farmerId", getFarmerWithItems);
router.put("/updateFarmer", updateFarmer);
router.delete("/deleteFarmer/:farmerId", deleteFarmer);

module.exports = router;