const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    trainerCode: {
        type: Number,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    altMobile: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
});

module.exports = mongoose.model("Trainer", trainerSchema);
