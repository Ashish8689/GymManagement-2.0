const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    clientCode: {
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
    membership: Number,
    membershipEnding: Date,
    altMobile: Number,
    endDate: Date,
    membershipHistory: [
        {
            paymentDate: {
                type: Date,
                required: true,
            },
            membership: {
                type: String,
                required: true,
            },
            membershipEnding: {
                type: Date,
                required: true,
            },
            paymentCollector: {
                type: String,
                required: true,
            },
            paymentMethod: {
                type: String,
                required: true,
            },
            transactionId: String,
        },
    ],
});

module.exports = mongoose.model("Client", clientSchema);
