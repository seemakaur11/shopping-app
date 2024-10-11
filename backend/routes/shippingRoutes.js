/**
 * File - routes/shippingRoutes.js
 * Desc - Created a shipping routes file
 * Author - seema
 * Date - 09/26/2024
 * 
 */

const express = require('express');
const { protect } = require("../middleware/authMiddleware");
const Shipping = require('../models/Shipping');
const router = express.Router();

// POST request to save shipping information
router.post('/',protect, async(req,res) => {
    const { fullName, address, city, state, postalCode, country ,phoneNumber} = req.body;
    if (!fullName || !address || !city || !state || !postalCode || !country || !phoneNumber) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    try{
        const shippingInfo = new Shipping({
            user: req.user._id,
            fullName,address, city, state, postalCode, country, phoneNumber
        });
        const savedShippingInfo = await shippingInfo.save();
        return  res.status(201).json(savedShippingInfo);
    }
    catch (error) {
        console.log("error in be shipping info ===>",error)
        res.status(500).json({ message: "Server error" });
      }
});
module.exports = router;