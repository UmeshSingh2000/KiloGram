const Post = require('../Database/Models/postSchema');
const StatusCodes = require('../Utils/statusCodes');
const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises'); // use promise-based fs for async cleanup

const createPost = async (req, res) => {
    try {
        const { id } = req.user; // userId
        const { content } = req.body;
        const images = req.files; // array of files from multer

        
        if (!id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Not Allowed" });
        }

        if (!content || !images || images.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields required!' });
        }

        // Upload images to Cloudinary
        const uploadedImageUrls = [];
        for (const image of images) {
            const result = await cloudinary.uploader.upload(image.path, {
                folder: "kiloGram/posts",
                transformation: [
                    { width: 1200, crop: 'limit' },
                    { quality: "auto" },
                    { fetch_format: "auto" }
                ]
            });
            uploadedImageUrls.push(result.secure_url);

            // Delete the local file after upload
            await fs.unlink(image.path);
        }

        // Create the post
        const newPost = new Post({
            postedBy: id,
            content,
            image: uploadedImageUrls
        });

        await newPost.save();
        res.status(StatusCodes.CREATED).json({ message: 'Post Created', post: newPost });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = {
    createPost
};
