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
    dateOfJoining: Date,
    department: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Staff", staffSchema);
