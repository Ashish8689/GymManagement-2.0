const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    membershipHistory: [
        {
            membership: {
                type: String,
                required: true,
            },
            endDate: {
                type: String,
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
            date: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
