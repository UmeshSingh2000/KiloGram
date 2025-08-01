const jwt = require('jsonwebtoken')
const authenticateRefreshToken = (req, res, next) => {
    try {
        const token = req.cookies.refreshToken

        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_REFRESHTOKEN_SECRET)
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

module.exports = authenticateRefreshToken