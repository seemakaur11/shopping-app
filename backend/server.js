/**
 * file - server.js
 * author - seema
 * date - 08/31/2024
 * 
 */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data from requests

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
  });
  
  app.use('/api/users', userRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/shipping', shippingRoutes)
  app.use('/api/create-checkout-session', paymentRoutes);

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log("++++ Error in mongodb connection +++++",err));
  

  // Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

