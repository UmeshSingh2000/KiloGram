const express = require('express');
const helmet = require('helmet')
const dbConnect = require('./Database/dbConfig');
const app = express();
require('dotenv').config();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes')
const authenticateToken = require('./Middlewares/authenticateToken');
const cloudinaryConfig = require('./Cloudinary/config');
const User = require('./Database/Models/userSchema')

app.use(express.json());
app.use(helmet())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
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

app.get('/api/auth-check', authenticateToken, async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id, { password: 0, __v: 0 })
    res.status(200).json({ message: "Authenticated!", user })
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});