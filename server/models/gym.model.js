const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        joiningDate: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
        email: {
            type: String
        },
        altMobile: {
            type: String
        },
        gymName: {
            type:String,
            required:true
        },
        gymUsername:{
            type:String,
            required:true
        },
        gymPassword:{
            type:String,
            required:true
        }
    },
)

module.exports = mongoose.model('Gym', gymSchema );