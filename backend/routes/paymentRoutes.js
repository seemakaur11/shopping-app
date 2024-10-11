/**
 * File - routes/paymentRoutes.js
 * Desc - Created a payment routes file
 * Author - seema
 * Date - 09/27/2024
 *
 */

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const stripe = require("stripe")(
  "sk_test_51Q3YHkGvr8OwAqz4o07i7hkMaFinc1DY3MHQwN55xY1XvQ4yVbTR2ti8zgrIPplQWpGKmm44vNVlSmav0eQEfbxP00PgjI71DS"
);

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { products } = req.body;
  console.log("product body  ===", products);
  const lineItems = products?.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        // images: product.img,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({ id: session.id });
});

// router.post("/create-payment-intent", protect, async (req, res) => {
//   const { totalAmount } = req.body;
//   try {
//     // Create a payment intent with the specified amount
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(totalAmount * 100),
//       currency: "USD", // Change this to your desired currency
//       payment_method_types: ["card"],
//     });
//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//     });

//   } catch (error) {
//     console.error("Error creating payment intent:", error);
//     res.status(500).json({ message: "Payment failed" });
//   }
// });

module.exports = router;
