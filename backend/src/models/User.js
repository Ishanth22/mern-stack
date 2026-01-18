const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "restaurant"],
      default: "user"
    },

    savedReels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel"
      }
    ],

    cart: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food"
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
 