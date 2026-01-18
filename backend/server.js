const app=require("./app");
require("dotenv").config();
const connectDB=require("./src/config/db");

const PORT=process.env.PORT || 5000;

connectDB();

app.listen(PORT,()=>{
    console.log("server is running");
})