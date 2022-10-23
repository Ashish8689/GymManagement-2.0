const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: {
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
    age: {
        type: Number,
        required: true,
    },
    isActive: {
        default: true,
        type: Boolean,
    },
    dateOfJoining: Date,
});

module.exports = mongoose.model("Client", clientSchema);
