const { rateLimit } = require('express-rate-limit')

const createPostLimiter = rateLimit({
    max: 3,
    windowMs: 5 * 60 * 1000,
    message: 'To many request from this Ip.Retry after 1 minute!',
    standardHeaders: true,
    legacyHeaders: false
})


module.exports = {
    createPostLimiter
}