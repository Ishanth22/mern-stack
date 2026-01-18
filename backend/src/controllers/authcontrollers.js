const User=require("../models/User");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

exports.register =async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exsist"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });

        res.status(201).json({
            message:"user registered suceesfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role: user.role
            }
        });
    }catch(error){
        res.status(500).json({message:"server error"})
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not registered"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        const token=jwt.sign(
            {id:user._id ,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.json({
            message:"Login sucessfull",
            token,
             user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role: user.role
            }
        });
        
    }catch(error){
        res.status(500).json({message:"server error"})
    }
}