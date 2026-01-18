const express = require("express");
const { register } = require("../controllers/authcontrollers");
const {login}=require("../controllers/authcontrollers");
const {protect}=require("../middlewares/authmiddleware");
const {authorizedRole}=require("../middlewares/rolemiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.get("/me",protect,(req,res)=>{
    res.status(200).json({message:"You have accessed a protected route",user:req.user});
})
router.get("/restaurant-only",protect,authorizedRole("restaurant"),(req,res)=>{
    res.json({
        success:true,
        message:"restaurant user"
    })
});

module.exports = router;
