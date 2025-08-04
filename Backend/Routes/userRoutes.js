const express = require('express');
const { userRegister, userLogin, refreshToken, updateUserProfile } = require('../Controllers/userControllers');
const authenticateRefreshToken = require('../Middlewares/authenticateRefreshToken');
const { authLimiter } = require('../Limiter/authLimiter');

const authenticateToken = require('../Middlewares/authenticateToken');
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })


router.post('/userRegister', authLimiter, userRegister)
router.post('/userLogin', authLimiter, userLogin)
router.post('/refresh', authLimiter, authenticateRefreshToken, refreshToken)

router.put('/updateProfile', authenticateToken, upload.single('image'), updateUserProfile)



module.exports = router