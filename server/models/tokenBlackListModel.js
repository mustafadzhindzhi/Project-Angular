const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
    token: String,
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('TokenBlackList', tokenBlacklistSchema)