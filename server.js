const express = require("express");
// const Product = require("./models/ProductModels");


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

app.use("/farmer", farmerRouter);
app.use("/item", itemRouter);
app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Node JS app listening on port ${port}`);
    database();
});