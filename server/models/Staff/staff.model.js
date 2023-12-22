const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    employeeCode: {
        type: Number,
        required: true,
    },
    gender: {
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
    email: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    isActive: {
        default: true,
        type: Boolean,
    },
    maritalStatus: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        default: Date.now(),
        type: Date,
    },
    department: {
        type: String,
        required: true,
    },
    sourceOfHire: {
        type: String,
        required: true,
    },
    addedBy: {
        type: String,
        required: true,
    },
    updatedAt: {
        default: Date.now(),
        type: Date,
    },
    updatedBy: String,
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});

module.exports = mongoose.model("Staff", staffSchema);
