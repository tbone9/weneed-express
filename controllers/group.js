const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const Post = require('../models/Post');
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res, next) => {
    try {
        const allGroups = await Group.find();
        return res.json({
            success: true,
            count: posts.length,
            data: groups
        });
    } catch (error) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

router.get('/:id', function(req, res) {
    Group.findById({ _id: req.params.id })
        .populate("posts")
        .then(function(group) {
            res.json(group);
        })
        .catch(function(err) {
            console.log(err)
            res.json(err);
        });
});

// Creates a post and adds it to the group
router.post('/:id', function(req,res) {
    Post.create(req.body)
        .then(function(post) {
            return Group.findOneAndUpdate({ _id: req.params.id }, {$push: {posts: post._id}}, { new: true });
        })
        .then(function(group) {
            res.json(group);
        })
        .catch(function(err) {
            res.json(err);
        });
});

router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const group = await Group.create(req.body);
        return res.status(201).json({
            success: true,
            data: group
    });
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
})

module.exports = router;