const mongoose = require("mongoose");

const staffDepartmentSchema = new mongoose.Schema({
    department: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("StaffDepartment", staffDepartmentSchema);
