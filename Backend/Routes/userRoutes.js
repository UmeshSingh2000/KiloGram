const express = require('express');
const { userRegister, userLogin, refreshToken } = require('../Controllers/userControllers');
const authenticateRefreshToken = require('../Middlewares/authenticateRefreshToken');
const { authLimiter } = require('../Limiter/authLimiter');

const router = express.Router();

router.post('/userRegister', authLimiter, userRegister)
router.post('/userLogin', authLimiter, userLogin)
router.post('/refresh', authLimiter, authenticateRefreshToken, refreshToken)
module.exports = router