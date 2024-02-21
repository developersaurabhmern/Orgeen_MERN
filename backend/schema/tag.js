const mongoose = require('mongoose');

const Tag = mongoose.model('Tag', {
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

});


module.exports = { Tag}