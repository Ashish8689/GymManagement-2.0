const bcrypt = require("bcryptjs");

// Secure Password generator;
const getSecurePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const generatedPassword = await bcrypt.hash(password, salt);
    return generatedPassword;
};

module.exports = {
    getSecurePassword,
};
