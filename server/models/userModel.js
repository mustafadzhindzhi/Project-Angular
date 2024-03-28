const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types; 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [2, 'Username should be at least 2 characters long.'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password should be at least 5 characters.'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        },
    },
    image: {
        type: String, 
        required: true
    },
    projects: [{
        type: ObjectId,
        ref: 'Project',
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('User', userSchema);
