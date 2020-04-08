const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Group = require('../models/Group');
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');
// GET all posts
// route - GET /api/v1/post
router.get('/', async (req, res, next) => {

    try {
        // const decoded = await jwt.verify(req.token, process.env.TOKEN_SECRET);
        // if(decoded){
        const posts = await Post.find();
        return res.json({
            success: true,
            count: posts.length,
            data: posts
        });
        // } else {
        //     res.sendStatus(400)
        // }

    } catch (error) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

//Get posts for one group
router.get('/groupPosts/:groupId', async (req, res) => {
    try {
        const posts = await Post.find({ groupId: req.params.groupId });
        return res.json({
            success: true,
            data: posts
        });

    } catch (error) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
})

// GET one post

router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json({
            success: true,
            data: post
        });

    } catch (error) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// UPDATE one post

router.put('/:id', async (req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({
            success: true,
            data: updatedPost
        })
    } catch (error) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
})

// POST a post
router.post('/', async (req, res, next) => {
    try {
        const { title, description, postType, category } = req.body;
        const group = await Group.findOne({ _id: req.body.group_id });
        console.log(group, '<=== group');
        const post = await Post.create(req.body);
        await group.posts.push(post);
        await group.save();
        return res.status(201).json({
            success: true,
            data: post
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
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

// DELETE a post
// route - DELETE /api/v1/post/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        await Group.update({ _id: post.groupId }, { $pull: { posts: req.params.id } });
        // await group.update(
        //     { $pull: {posts: $in: [post.groupId]}}
        // )
        // await group.save(callback);
        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'No post found!'
            })
        }

        await post.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

module.exports = router;