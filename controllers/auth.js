// const express = require('express');
const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER NEW USER
router.post('/register', async(req, res) => {

    //Validate req.body
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        //Check if email exists
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('Email already exists!');

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //Create user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            city: req.body.city,
            state: req.body.state
        });
        const savedUser = await user.save();
        res.send({ user: user._id });
        return res.status(201).json({
            success: true,
            data: savedUser
    });
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
});

//LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        // checking if email exists
        const user = await User.findOne({email: req.body.email});
            if(!user) return res.status(400).send('Email or password is WRONG!');
        
        //Check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Email or password is WRONG!');

        // Create and assign JWT
        jwt.sign({user}, process.env.TOKEN_SECRET, {expiresIn: '1h'}, (err, token)=> {
            res.json({
                token
            });
        });
            
    
        // res.send('Logged in!');
        
    } catch (error) {
        res.send(error);
    }
    // Validate login information
});



module.exports = router;