const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
    try {
        // const authHeader = req.headers.authorization;
        // if (!authHeader) {
        //     return res.status(401).json({ message: "Authorization header missing" });
        // }
        const token = req.cookies.token
        // const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        }
        return res.status(403).json({ message: 'Authentication failed' });
    }
}

module.exports = authenticateToken