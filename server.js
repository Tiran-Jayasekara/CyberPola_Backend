const express = require("express");

const app = express();
const port = 3001;
var cors = require("cors");
const database = require("./database/database");

app.use(express.json());
app.use(cors());
app.options("*", cors());

const farmerRouter = require("./route/farmer");
const itemRouter = require("./route/item");
const userRouter = require("./route/user");
const cartRouter = require("./route/cart");
const farmerPdfUplode = require("./route/farmerRegister")

app.use("/farmer", farmerRouter);
app.use("/farmerPdfUplode", farmerPdfUplode);
app.use("/item", itemRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);

app.listen(port, () => {
    console.log(`Node JS app listening on port ${port}`);
    database();
});