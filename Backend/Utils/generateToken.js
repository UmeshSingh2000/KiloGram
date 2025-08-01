const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    try {
        const secret = process.env.JWT_SECRET;
        const payload = { id: userId }
        return jwt.sign(payload, secret, {
            expiresIn: '15m'
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

const generateRefreshToken = (userId) => {
    try {
        const secret = process.env.JWT_REFRESHTOKEN_SECRET;
        const payload = { id: userId }
        return jwt.sign(payload, secret, {
            expiresIn: '15d'
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}


module.exports = { generateToken, generateRefreshToken }