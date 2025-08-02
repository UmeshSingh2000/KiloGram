const express = require('express');
const authenticateToken = require('../Middlewares/authenticateToken');
const { createPost, getMyPost, postLikeToggle } = require('../Controllers/postController');
const upload = require('../Middlewares/uploadMiddleware');
const router = express.Router();


router.post('/createPost', authenticateToken, upload.array('image', 5), createPost)
router.get('/getMyPosts', authenticateToken, getMyPost)
router.post('/postLikeToggle/:postId', authenticateToken, postLikeToggle)



module.exports = router