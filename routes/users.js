const express = require('express')
const userModel = require('../models/userModel')
const characterModel = require('../models/characterModel')
const router = express.Router()
const bcrypt = require('bcrypt')


// Register user
router.post('/register', async (req, res) => {

    try {
        const password = await bcrypt.hash(req.body.password, 10)
        const user = new userModel({
        user: req.body.user,
        password: password
        })

        const findUser = await userModel.findOne ({ user: req.body.user })
    
        if (!findUser) {
            await user.save()
            res.status(200).send({ status: user.user + ' Registered'})
        } else {
            res.status(400).json('user already exists')
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


// Login user
router.post('/login', async (req, res) => {

    try {
     const user = await userModel.findOne({ user: req.body.user })

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
       
        return res.status(401).json('Wrong user or password')
    } else {
        req.session.user = user
        
        res.status(200).json('You are logged in')
    }

    }catch (err) {
        res.status(500).send(err)
    }
})


// Authenticate user
router.get('/auth', async (req, res) => {

    try {
       if(req.session.user) {
           res.status(200).json(req.session.user)
       } else {
        res.status(400).send()
       }

    } catch (err) {
        res.status(500).send(err)
    }
})


// Logout user
router.delete('/logout', async (req, res) => {

    try {

    req.session = null
    res.status(200).json('You are now logged out!')

    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router