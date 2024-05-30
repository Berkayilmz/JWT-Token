const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String },
    token: { type: String }
});

module.exports = mongoose.model('User', userSchema);
