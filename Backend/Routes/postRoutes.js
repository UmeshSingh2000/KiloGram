const express = require('express');
const authenticateToken = require('../Middlewares/authenticateToken');
const { createPost } = require('../Controllers/postController');
const upload = require('../Middlewares/uploadMiddleware');
const router = express.Router();


router.post('/createPost', authenticateToken, upload.array('image', 5), createPost)

module.exports = router