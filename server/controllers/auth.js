const {
    userModel,
    tokenBlacklistModel,
    projectModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData
}

function register(req, res, next) {
    const { tel, email, username, password, repeatPassword } = req.body;

    return userModel.create({ tel, email, username, password })
        .then((createdUser) => {
            createdUser = bsonToJson(createdUser);
            createdUser = removePassword(createdUser);

            const token = utils.jwt.createToken({ id: createdUser._id });
            if (process.env.NODE_ENV === 'production') {
                res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
            } else {
                res.cookie(authCookieName, token, { httpOnly: true })
            }
            res.status(200)
                .send(createdUser);
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                let field = err.message.split("index: ")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));

                res.status(409)
                    .send({ message: `This ${field} is already registered!` });
                return;
            }
            next(err);
        });
}

function login(req, res, next) {
    const { email, password } = req.body;
    console.log('Login request received:', req.body); 

    userModel.findOne({ email })
        .then(user => {
            console.log('User found:', user); // Log user object
            if (!user) {
                // User not found
                res.status(401).json({ message: 'User not found' });
                return;
            }
            user.matchPassword(password)
                .then(match => {
                    if (!match) {
                        // Incorrect password
                        res.status(401).json({ message: 'Wrong email or password' });
                        return;
                    }

                    // Authentication successful
                    user = bsonToJson(user);
                    user = removePassword(user);

                    const token = utils.jwt.createToken({ id: user._id });

                    if (process.env.NODE_ENV === 'production') {
                        res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
                    } else {
                        res.cookie(authCookieName, token, { httpOnly: true })
                    }
                    res.status(200).json(user);
                })
                .catch(next); // Catch any errors from matchPassword
        })
        .catch(next); // Catch any errors from findOne
}


function logout(req, res) {
    const token = req.cookies[authCookieName];

    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName)
                .status(204)
                .send({ message: 'Logged out!' });
        })
        .catch(err => res.send(err));
}

function getUserProfiles(req, res, next) {
    userModel.find()
        .populate('projects')
        .then(usersWithProjects => {
            res.json(usersWithProjects);
        })
        .catch(error => {
            console.error('Error fetching user profiles:', error);
            res.status(500).json({ error: 'Failed to fetch user profiles' });
        });
}

function getUserProjects(req, res, next) {
    const userId = req.params.userId;

    projectModel.find({ userId: userId })
        .then(projects => {
            res.json(projects);
        })
        .catch(error => {
            console.error('Error fetching user projects:', error);
            res.status(500).json({ error: 'Failed to fetch user projects' });
        });
}


module.exports = {
    login,
    register,
    logout,
    getUserProfiles, 
    getUserProjects
}
