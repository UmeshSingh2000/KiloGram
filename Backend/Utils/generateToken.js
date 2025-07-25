const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    try {
        const secret = process.env.JWT_SECRET;
        const payload = { userId }
        return jwt.sign(payload, secret, {
            expiresIn: '1d'
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = generateToken