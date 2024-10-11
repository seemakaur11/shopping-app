/**
 * File - models/Shipping.js
 * Desc - Created shipping schema file
 * Author - seema
 * Date - 09/26/2024
 * 
 */
const mongoose = require('mongoose');
const shippingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: { type: String, required: true},
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
},
    {timestamps: true}
    
);

module.exports = mongoose.model('Shipping', shippingSchema);