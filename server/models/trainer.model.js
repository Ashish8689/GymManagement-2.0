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
    maritalStatus: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
    },
    isActive: {
        default: true,
        type: Boolean,
    },
    dateOfJoining: Date,
});

module.exports = mongoose.model("Trainer", trainerSchema);
