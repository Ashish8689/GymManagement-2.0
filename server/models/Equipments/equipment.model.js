const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
    equipment: {
        type: String,
        required: true,
    },
    dateOfPurchase: {
        type: Date,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: String,
    vendor: {
        type: String,
        required: true,
    },
    vendorContact: {
        type: Number,
        required: true,
    },
    vendorAddress: {
        type: String,
    },
    costPerItem: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    finalPricePerItem: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: String,
        required: true,
    },
    category: {
        id: String,
        category: {
            type: String,
            required: true,
        },
        description: String,
    },
});

module.exports = mongoose.model("Equipments", equipmentSchema);
