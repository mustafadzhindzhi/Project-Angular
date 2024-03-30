const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    mainPhoto: {
        type: String,
        required: true,
    },
    smallDesc: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    industry: {
        type: String,
        required: true,
    },
    deliverables: {
        type: String,
        required: true,
    },
    systems: [{
        type: String,
        required: true,
    }],
    bigDescription: {
        type: String,
        required: true,
    },
    challenges: [{
        id: Number,
        description: String,
    }],
    approach: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    likes: {
        type: Number,
        default: 0,
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Project', projectSchema);
