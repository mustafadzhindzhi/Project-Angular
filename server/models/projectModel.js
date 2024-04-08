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
    likes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    _ownerId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

projectSchema.methods.unlike = function(userId) {
    const index = this.likes.indexOf(userId);
    if (index !== -1) {
        this.likes.splice(index, 1);
    }
};

module.exports = mongoose.model('Project', projectSchema);
