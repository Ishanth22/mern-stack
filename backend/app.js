const express=require("express");
const cors=require("cors");
const authRoutes=require("./src/routes/authRoutes")
const restaurantroute=require("./src/routes/restaurentroutes")
const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/restaurant",restaurantroute);
app.get("/" ,(req,res)=>{
    res.send("Backend is running");
})

module.exports=app;
