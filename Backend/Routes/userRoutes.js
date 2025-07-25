const express = require('express');
const { userRegister, userLogin } = require('../Controllers/userControllers');

const router = express.Router();

router.post('/userRegister',userRegister)
router.post('/userLogin',userLogin)

module.exports = router