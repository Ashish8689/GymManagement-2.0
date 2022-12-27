const login = require("../models/login.model");
const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

authenticateLogin = async (req, res, next) => {
    try {
        try {
            const { username, password } = req.body;
            const user = await login.findOne({ username });

            if (user) {
                const { password: userPassword, _id, isActive, role } = user;
                const passwordCompare = await bcrypt.compare(password, userPassword);
                if (passwordCompare) {
                    try {
                        const token = await jwt.sign(
                            {
                                _id,
                                isActive,
                                role,
                            },
                            process.env.SECRET_JWT_TOKEN
                        );

                        return res
                            .status(HTTP_STATUS_CODE.SUCCESS)
                            .header("Authorization", token)
                            .json({
                                user,
                                token,
                            });
                    } catch (error) {
                        throw new AppError("Error generating token.", HTTP_STATUS_CODE.BAD_REQUEST);
                    }
                } else {
                    return res
                        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
                        .json({ error: "Username or Password is incorrect" });
                }
            } else {
                return res
                    .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
                    .json({ error: `No user found with name ${username}` });
            }
        } catch (error) {
            throw new AppError(
                "Error occur while logging in",
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authenticateLogin,
};
