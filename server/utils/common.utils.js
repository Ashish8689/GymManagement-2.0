const jwt = require("jsonwebtoken");

const extractUserDataFromToken = async (req) => {
    const tokenData = jwt.verify(
        req.header("Authorization").split(" ")[1],
        process.env.SECRET_JWT_TOKEN
    );

    return tokenData.data;
};

module.exports = {
    extractUserDataFromToken,
};
