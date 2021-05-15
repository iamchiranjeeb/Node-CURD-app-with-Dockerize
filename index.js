const express = require('express');
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose');
const env =require('dotenv/config');
require('./db/mongoose')


const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(userRoutes)
app.use(authRoutes)


app.listen(PORT,()=>{
    console.log(`Example app listening at ${PORT}`);
})