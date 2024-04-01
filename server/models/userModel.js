const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const saltRounds = Number(process.env.SALTROUNDS) || 10;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format',
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [2, 'Username should be at least 2 characters long.'],
        validate: {
            validator: validator.isAlphanumeric,
            message: 'Username must contain only alphanumeric characters',
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password should be at least 8 characters.'],
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value);
            },
            message: 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.',
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

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);