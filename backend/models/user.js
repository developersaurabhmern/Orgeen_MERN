const mongoose = require('mongoose');

const User = mongoose.model('User', {

    // name: {
    //     type: String
    // },
    // email: {
    //     type: String
    // },
    // // phone: {
    // //     type: Number},

    // password: {
    //     type: String
    // },
    // term: {
    //     type: Number
    // },
    // usertype: {
    //     type: String
    // },
    // created_at: {
    //     type: Date
    // },
    // update_at:{
    //     type: Date
    // }

    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    term: {
        type: Number
    },
    created_at: {
        type: Date
    },
    update_at:{
        type: Date
    },
    usertype: {
        type: String
    },
});


module.exports = User