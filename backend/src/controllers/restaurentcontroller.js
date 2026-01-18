const Restaurant=require("../models/Restaurant");

exports.createRestaurant = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    
    if (!name || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    
    const existingRestaurant = await Restaurant.findOne({ owner: req.user._id });
    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant already registered for this account",
      });
    }


    const restaurant = await Restaurant.create({
      owner: req.user._id,
      name,
      email,
      phone,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
