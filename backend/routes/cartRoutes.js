/**
 * File - routes/cartRoutes.js
 * Desc - Created a cart routes file
 * Author - seema
 * Date - 09/07/2024
 * 
 */

const express = require('express');
const { protect } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const router = express.Router();

// Add or update product in cart
router.post("/add", protect, async (req, res) => {
  const { productId, quantity,name, price,img,totalPrice } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    // let updatedPrice = cart.cartItems ? cart.cartItems?.[price] * quantity : "seema";
    const updatedPrice = totalPrice
    if (cart) {
      // If cart exists for the user, check if the product already exists
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        // If product exists in the cart, update the quantity
        cart.cartItems[itemIndex].quantity += quantity;
      } else {
        // If product does not exist, add it to the cart
        cart.cartItems.push({ product: productId, quantity,name,price,img,totalPrice: updatedPrice });
      }
    } else {
      // If no cart exists, create a new cart for the user
      cart = new Cart({
        user: req.user._id,
        cartItems: [{ product: productId, quantity,name,price,img,totalPrice: updatedPrice }],
      });
    }
    await cart.save();
    return res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// get user cart
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if(!cart) return res.status(404).json({ message: "Product not found"})
   return res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove item from cart
router.delete("/remove/:id", protect,async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Product not found" });
    
      // // Find the item in the cart and remove it
      // const deletedItem = await Cart.findOneAndDelete({ id: cartItemId, user: req.user._id });
      // console.log("dete;lte item ==>",deletedItem)
      // if (deletedItem) {
      //   res.status(200).json({ message: 'Item removed from cart' });
      // } else {
      //   res.status(404).json({ message: 'Cart item not found' });
      // }
    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== cartItemId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT route to update cart item quantity
router.put('/update/:id',protect, async(req, res) => {
  try {
    const userId = req.user._id;
    const itemId = parseInt(req.params.id);
    const { quantity } = req.body;
     if(quantity <= 0) return res.status(400).json({ message: "Quantity must be greater than zero"});

     // Find the cart item to get the product price
     const cart = await Cart.findOne({ user: userId });
     if (!cart) return res.status(404).json({ message: 'Cart not found' });

     const cartItem = cart.cartItems.find(item => item.product === itemId);
     if (!cartItem) return res.status(404).json({ message: 'Product not found in cart' });
     // Calculate the updated price
    const updatedPrice = cartItem.price * quantity;
     const updatedCart = await Cart.findOneAndUpdate(
      { user: userId, 'cartItems.product': itemId },
      { $set: { 'cartItems.$.quantity': quantity,'cartItems.$.totalPrice': updatedPrice, } }, // $ refers to the matched item in the array
      { new: true } // Return the updated document
    );
     if(!updatedCart) return res.status(400).json({ message: "Item not found"});
     return res.send(updatedCart);

  }catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ message: 'Server error' });
  }
})


module.exports = router;
