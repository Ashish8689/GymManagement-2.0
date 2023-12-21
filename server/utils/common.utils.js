const jwt = require("jsonwebtoken");
const AppError = require("./app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");
const SECRET_JWT_TOKEN =
    "TERIAANKHONKINAMKEENMASTIYAANTERIHANSIKIBEPARWAAHGUSTAKHIYAANJABTAKHAIJAAN";

const extractUserDataFromToken = async (req) => {
    const tokenData = jwt.verify(req.header("Authorization").split(" ")[1], SECRET_JWT_TOKEN);

    return tokenData.data;
};

module.exports = {
    extractUserDataFromToken,
};
