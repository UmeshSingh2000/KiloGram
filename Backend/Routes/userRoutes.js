const express = require('express');
const { userRegister, userLogin, refreshToken } = require('../Controllers/userControllers');
const authenticateRefreshToken = require('../Middlewares/authenticateRefreshToken');

const router = express.Router();

router.post('/userRegister',userRegister)
router.post('/userLogin',userLogin)
router.post('/refresh',authenticateRefreshToken,refreshToken)
module.exports = router