const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new mongoose.Schema({
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
    posts : [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

module.exports = mongoose.model('Group', GroupSchema);