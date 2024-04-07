const { verifyToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decoded = await verifyToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            console.error("Error verifying token:", error);
            return res.status(401).json({ error: "Unauthorized" });
        }
    } else {
        console.log("No token provided");
        return res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = { authMiddleware };
