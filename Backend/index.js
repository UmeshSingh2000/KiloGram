const express = require('express');
const helmet = require('helmet')
const dbConnect = require('./Database/dbConfig');
const app = express();
require('dotenv').config();
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes');
const authenticateToken = require('./Middlewares/authenticateToken');

app.use(express.json());
app.use(helmet())
app.use(cors({
    origin:'http://localhost:5173'
}))
//database connection
dbConnect();

app.get('/',(req,res)=>{
    res.json({
        message: 'Backend is running'
    });
});

app.use('/api',userRoutes)
app.get('/api/auth-check',authenticateToken,(req,res)=>{
    res.status(200).json({message:"Authenticated!"})
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});