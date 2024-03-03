const express = require("express");
const router = express.Router();

const { addUser, UserLogin } = require("../controller/userController");

router.post("/addUser", addUser);
router.post("/UserLogin", UserLogin);
// router.get("/allFarmers", allFarmers);
// router.get("/FarmerWithItems/:farmerId", getFarmerWithItems);
// router.put("/updateFarmer", updateFarmer);
// router.delete("/deleteFarmer/:farmerId", deleteFarmer);

module.exports = router;