const { verifyToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const decoded = await verifyToken(token);
        req.user = decoded;

        next();
    } 
}

module.exports = { authMiddleware }