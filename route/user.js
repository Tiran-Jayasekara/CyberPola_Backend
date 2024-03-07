const express = require("express");
const router = express.Router();

const { addUser, UserLogin, GetUserData } = require("../controller/userController");

router.post("/addUser", addUser);
router.post("/UserLogin", UserLogin);
router.get("/UserData/:userId", GetUserData);


module.exports = router;