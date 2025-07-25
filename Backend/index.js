const express = require('express');
const helmet = require('helmet')
const dbConnect = require('./Database/dbConfig');
const app = express();
require('dotenv').config();
const userRoutes = require('./Routes/userRoutes')

app.use(express.json());
app.use(helmet())

//database connection
dbConnect();

app.get('/',(req,res)=>{
    res.json({
        message: 'Backend is running'
    });
});

app.use('/api',userRoutes)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});