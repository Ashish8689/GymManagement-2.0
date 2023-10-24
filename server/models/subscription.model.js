const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    description: String,
});

module.exports = mongoose.model("subscription", SubscriptionSchema);
