const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Add a title']
    },
    description: {
        type: String,
        required: [true, 'Add a description']
    },
    date: {
        type: Date,
        default: Date.now
    },
    postType: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }, 
    resolved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Post', PostSchema);