const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        restaurant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Restaurent",
            required:true
        },

        items:[
            {
                food:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Food",
                    required:true
                },
                quantity:{

                }
            }
        ],


    }
)