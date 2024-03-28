
const jwt = require('./jwt');
const { authCookieName } = require('../app-config');
const {
    userModel,
    tokenBlacklistModel
} = require('../models');

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
        if (req.originalUrl.startsWith('/api')) { 
            const token = req.cookies[authCookieName] || '';
            if (token) {
                jwt.verifyToken(token)
                    .then(data => {
                        userModel.findById(data.id)
                            .then(user => {
                                req.user = user;
                                req.isLoggedIn = true;
                                next();
                            })
                            .catch(() => {
                                res.status(401).send({ message: 'Unauthorized: Invalid token!' });
                            });
                    })
                    .catch(err => {
                        if (!redirectUnauthenticated) {
                            next();
                            return;
                        }
                        console.error(err);
                        res.status(401).send({ message: 'Unauthorized: Invalid token!' });
                    });
            } else {
                if (!redirectUnauthenticated) {
                    next();
                    return;
                }
                res.status(401).send({ message: 'Unauthorized: No token provided!' });
            }
        } else {
            next();
        }
    };
}

module.exports = auth;
