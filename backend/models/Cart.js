/**
 * File - models/Cart.js
 * Desc - Created cart schema file
 * Author - seema
 * Date - 09/06/2024
 * 
 */
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
      },
      cartItems: [
        {
          product: { 
            type: Number, 
            ref: 'Product', 
            required: true 
          },
          quantity: { 
            type: Number, 
            required: true, 
            default: 1 
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type:Number,
            required: true
          },
          totalPrice: {
            type:Number,
            required: true
          },
          img: {
            type:String,
            required: true
          }
        }
      ]
});

module.exports = mongoose.model('Cart', cartSchema);