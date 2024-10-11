/**
 * File - models/User.js
 * Desc - Created user schema file
 * Author - seema
 * Date - 08/31/2024
 * 
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true},
    role: { type: String, default: 'customer' },
});

module.exports = mongoose.model('User', userSchema);