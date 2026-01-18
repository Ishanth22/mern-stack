const express=require("express");
const router=express.Router();

const {protect}=require("../middlewares/authmiddleware");
const {authorizedRole}=require("../middlewares/rolemiddleware");
const {addFood}=require("../controllers/foodcontroller");

router.post(
    "/add",
    protect,
    authorizedRole("restaurant"),
    addFood
);
module.exports=router;