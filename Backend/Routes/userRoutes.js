const express = require('express');
const { userRegister } = require('../Controllers/userControllers');

const router = express.Router();

router.post('/userRegister',userRegister)

module.exports = router