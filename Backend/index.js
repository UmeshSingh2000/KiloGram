const express = require('express');
const dbConnect = require('./Database/dbConfig');
const app = express();
require('dotenv').config();

app.use(express.json());


//database connection
dbConnect();

app.get('/',(req,res)=>{
    res.json({
        message: 'Backend is running'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});