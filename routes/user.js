const express = require('express');
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyjwt')

const router = express.Router();

router.get('/token',(req,res)=>{
    const token = jwt.sign({_id:"chiru"},process.env.secretKey);
    res.send(token)
})

router.get('/', (req,res)=>{
    res.json({
        body:{
            message:'Hello Looser'
        }
    })
})

router.post('/data', async(req,res)=>{
    // const salt = await bcrypt.genSalt(10);
    // const hashPasswords = await bcrypt.hash(req.body.password, salt);
    const user = new userModel(req.body);
    try{
        await user.save();
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err.message)
    }
});

router.get('/data/all',verifyToken,async(req,res)=>{
    try{
        const user = await userModel.find({})
        res.status(200).send(user);
    }catch(err){
        res.status(500).send(err.message)
    }
});

router.get('/data/:id',async(req,res)=>{
    try{
        const dataId = req.params.id
        const user = await userModel.findById(dataId)
        if(!user){
            return res.status(404).send("User Not Found");
        }
        res.status(200).json({
            name: user.name,
            age: user.age,
            email: user.email
        })
    }catch(err){
        res.status(500).send(err.message)
    }
});

router.delete('/data/:id',async(req,res)=>{
    const userId = req.params.id
    try{
        const user = await userModel.findOneAndDelete({_id: userId})
        if(!user){
            return res.status(404).send("User Not Found");
        }
        res.status(200).send(`${user.name} id Deleted.`)
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.patch('/data/:id',async(req,res)=>{
    const userId = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdates = ['name','age','email','password']

    const isValidOperations = updates.every((update)=> {
        return allowUpdates.includes(update)
    })

    if(!isValidOperations){
        return res.status(400).send("Invalid Update")
    }

    try{
        const userDetails = await userModel.findOne({_id:userId})
        if(!userDetails){
            res.status(404).send("User Not Found")
        }
        updates.forEach((update)=> userDetails[update] = req.body[update])
        await userDetails.save()
        res.status(200).send(userDetails)
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports = router
