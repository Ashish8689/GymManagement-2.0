const admin = require("../models/admin.model");
const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

authenticateLogin = async (req, res, next) => {
    try {
        try {
            const { username, password } = req.body;
            const user = await admin.findOne({ username });

            if (user) {
                const {
                    password: userPassword,
                    _id: id,
                    isActive,
                    username,
                    role,
                    email,
                    dateOfJoining,
                } = user;
                const passwordCompare = await bcrypt.compare(password, userPassword);

                if (passwordCompare) {
                    try {
                        const token = jwt.sign(
                            {
                                data: {
                                    id,
                                    username,
                                    isActive,
                                    role,
                                    email,
                                    dateOfJoining,
                                },
                            },
                            process.env.SECRET_JWT_TOKEN,
                            {
                                expiresIn: "1h",
                            }
                        );

                        return res
                            .status(HTTP_STATUS_CODE.SUCCESS)
                            .header("Authorization", token)
                            .json({
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
