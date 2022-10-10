const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        mobile: {
            type: String,
            required: true,
        },
        altMobile: {
            type: String
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
        email: {
            type: String
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        access:{
            type:String,
            required:true
        }
 
    }
)

module.exports = mongoose.model('Trainer', trainerSchema);