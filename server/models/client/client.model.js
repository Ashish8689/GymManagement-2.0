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
    // joiningDate: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
    },
    altMobile: {
        type: String,
    },
});

module.exports = mongoose.model("Client", clientSchema);
