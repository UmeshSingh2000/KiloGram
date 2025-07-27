const express = require('express');
const helmet = require('helmet')
const dbConnect = require('./Database/dbConfig');
const app = express();
require('dotenv').config();
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes')
const authenticateToken = require('./Middlewares/authenticateToken');
const cloudinaryConfig = require('./Cloudinary/config');

app.use(express.json());
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:5173'
}))
//database connection
dbConnect();
cloudinaryConfig();

app.get('/', (req, res) => {
    res.json({
        message: 'Backend is running'
    });
});

app.use('/api', userRoutes) //user related routes
app.use('/api', postRoutes) //post related routes

app.get('/api/auth-check', authenticateToken, (req, res) => {
    res.status(200).json({ message: "Authenticated!", user: req.user })
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});