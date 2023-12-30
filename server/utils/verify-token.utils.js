const jwt = require("jsonwebtoken");
const AppError = require("./app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");

module.exports = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.cookies;
        console.log(token);
        const verified = jwt.verify(token, process.env.SECRET_JWT_TOKEN);

        if (verified) {
            console.log(verified);
            next();
        } else {
            throw new AppError("Token expired", HTTP_STATUS_CODE.UN_AUTHORIZED);
        }
    } catch (error) {
        throw new AppError("Invalid token", HTTP_STATUS_CODE.UN_AUTHORIZED);
    }
};
