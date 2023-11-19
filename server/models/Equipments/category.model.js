const mongoose = require("mongoose");

const equipmentCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    description: String,
});

module.exports = mongoose.model("EquipmentCategory", equipmentCategorySchema);
