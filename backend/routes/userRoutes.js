/**
 * File - routes/UserRoutes.js
 * Desc - Created user register and login routes file
 * Author - seema
 * Date - 08/31/2024
 * 
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//register

router.post('/register', async(req,res) => {
 
    const {name , email, password, phone} = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) return res.status(400).json({msg:'User already exists'});

        user = new User({ name, phone, email, password: bcrypt.hashSync(password, 10) });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).json({ user: { 
            id: user._id, name: user.name,
            phone: user.phone,
             email: user.email } });
    }
    catch(err){
        res.status(500).json({msg: "Server Error"});
    }
})

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true }).json({ user: { 
        id: user._id, name: user.name,
        phone: user.phone,
         email: user.email
       } });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
  module.exports = router;