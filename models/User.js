const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    messagesSent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    messagesReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

module.exports = mongoose.model('User', UserSchema);