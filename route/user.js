const express = require("express");
const router = express.Router();

const { addUser, UserLogin } = require("../controller/userController");

router.post("/addUser", addUser);
router.post("/UserLogin", UserLogin);

module.exports = router;