const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { farmerUploadFile } = require("../controller/FarmerRegister");


router.post("/farmerUploadFile",upload.single('farmer'), farmerUploadFile);


module.exports = router;