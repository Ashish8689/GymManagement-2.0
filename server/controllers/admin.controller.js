const Admin = require("../models/admin.model");
const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");
const { getSecurePassword } = require("../utils/secure-password");

addAdmin = async (req, res, next) => {
    try {
        const { username, email, password: userPassword } = req.body;
        const joiningStatus = {
            role: "ADMIN",
            isActive: true,
            dateOfJoining: new Date(),
        };
        const data = { username, email, ...joiningStatus };
        const password = await getSecurePassword(userPassword);

        const adminData = new Admin({
            ...data,
            password,
        });

        try {
            await adminData.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to create the admin.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addAdmin,
};
