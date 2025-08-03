const { rateLimit } = require('express-rate-limit')

const authLimiter = rateLimit({
    max: 4,
    windowMs: 60 * 1000,
    message: 'To many request from this Ip.Retry after 1 minute!',
    standardHeaders : true,
    legacyHeaders : false
})

module.exports = {
    authLimiter
}