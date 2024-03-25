const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    miniDescription: {
        type: String,
        required: true,
    },
    largeDescription: {
        type: String,
        required: true,
    },
    images: [{
        type: String, 
        required: true,
    }],
    likes: [{
        type: ObjectId,
        ref: 'User',
    }],
    userId: {
        type: ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Project', projectSchema);
