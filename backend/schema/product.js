const mongoose = require('mongoose');
const { init } = require('../models/post');

const Product = mongoose.model('Product', {
    name: {
        type: String
    },
    slug: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId
    },
    tag: {
        type: Array
    },
    sale_price: {
        type: Number
    },
    discount_percen: {
        type: Number
    },
    discount_rupee: {
        type: Number
    },
    offer_price: {
        type: Number
    },
    stock_status: {
        type: Number
    },
    product_desc: {
        type: String
    },
    created_at:{
        type: Date
    }

});


module.exports = { Product }