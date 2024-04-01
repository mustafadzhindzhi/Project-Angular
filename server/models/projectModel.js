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
        type: String,
        required: true,
    }],
    approach: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: false
    }],
    likes: {
        type: Number,
        default: 0,
    },
    _ownerId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Project', projectSchema);
