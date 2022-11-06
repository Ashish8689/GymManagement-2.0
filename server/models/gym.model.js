const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
    gymCode: {
        type: String,
        required: true,
    },
    gymName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
    },
    email: {
        type: String,
    },
    altMobile: {
        type: String,
    },
});

module.exports = mongoose.model("Gym", gymSchema);
