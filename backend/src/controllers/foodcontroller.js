const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");

exports.addFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;


    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required",
      });
    }

    
    const restaurant = await Restaurant.findOne({ owner: req.user._id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found for this user",
      });
    }

    
    const food = await Food.create({
      restaurant: restaurant._id,
      name,
      description,
      price,
      category,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Food item added successfully",
      food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const mongoose = require("mongoose");

exports.getRestaurantMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "restaurantId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid restaurantId",
      });
    }

    const foodItems = await Food.find({
      restaurant: restaurantId,
      isAvailable: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foodItems.length,
      foodItems,
    });
  } catch (error) {
    console.error("GET MENU ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
