const mongoose = require('mongoose');

const Category = mongoose.model('Category', {
    name: {
        type: String,
        required: true,
    },

    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    image: {
        type: String
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    }

});


module.exports = { Category}