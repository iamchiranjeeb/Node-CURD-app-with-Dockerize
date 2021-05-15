const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


const userModel = require('../models/User')

router.post('/login', async (req, res) => {
    // 1. Verify Email , 2. Password Verification, -> return response
    const user = await userModel.findOne({ email: req.body.email})
    if(!user){
        return res.status(400).send("Invalid user email")
    }
    const passwordVerification = await bcrypt.compare(req.body.password,user.password)
    if(!passwordVerification){
        return res.status(400).send("Invalid Password")
    }
    const token = jwt.sign({_id:user._id},process.env.secretKey);
    res.status(200).json({
        body:{
            UserName : user.name,
            Age : user.age,
            Email : user.email,
        }
    })
})

module.exports = router