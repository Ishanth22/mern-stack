const express = require("express");
const router = express.Router();

const {protect}=require("../middlewares/authmiddleware");
const {createRestaurant}=require("../controllers/restaurentcontroller");
const {authorizedRole}=require("../middlewares/rolemiddleware");


router.post(
    "/createRes",
    protect,
    authorizedRole("restaurant"),
    createRestaurant
);

module.exports=router;