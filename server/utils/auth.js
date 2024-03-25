const jwt = require('./jwt');
const { authCookieName } = require('../app-config');
const {
    userModel,
    tokenBlackListModel
} = require('../models');
const { log } = require('console');

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
        const token = req.cookies[authCookieName] || '';
        Promise.all([
            jwt.verifyToken(token),
            tokenBlackListModel.findOne({ token }),
        ])
            .then(([data, blackListToken]) => {
                if (blackListToken) {
                    return Promise.reject(new Error('blacklisted token'));
                }
                userModel.findById(data.id)
                    .then(user => {
                        req.user = user;
                        req.isLogged = true;
                        next();
                    })
            })
            .catch(err => {
                if (!redirectUnauthenticated) {
                    next();
                    return;
                }
                if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                    console.log(err);
                    res
                        .status(401)
                        .send({ message: 'Invalid token!' });
                    return;
                }
                next(err);
            })
    }
};

module.exports = auth;