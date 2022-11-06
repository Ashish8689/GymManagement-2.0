const Gym = require("../models/gym.model");
const bcrypt = require("bcryptjs");

// App Error class
const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");

addGym = async (req, res, next) => {
    try {
        // Secure Password generator;
        // const salt = await bcrypt.genSalt(10);
        // const securePassword = await bcrypt.hash(req.body.gymPassword, salt);
        // const gymObject = { ...req.body, gymPassword: securePassword };

        const joiningStatus = {
            isActive: true,
            dateOfJoining: new Date(),
        };

        try {
            const gym = new Gym({ ...req.body, ...joiningStatus });
            await gym.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: {
                        success: true,
                    },
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to add the Gym.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

getGym = async (req, res, next) => {
    try {
        try {
            const gym = await Gym.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: gym,
                });
        } catch (error) {
            throw new AppError("Unable to fetch all Gyms.", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        next(error);
    }
};

getGymByCode = async (req, res, next) => {
    try {
        try {
            const gym = await Gym.findOne({ gymCode: req.params.code });
            if (!gym) {
                throw new AppError("No Gym found.", HTTP_STATUS_CODE.NOT_FOUND);
            }
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: gym,
                });
        } catch (error) {
            throw new AppError(
                `Unable to find the Gym by code ${req.params.code}.`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

updateGymStatus = async (req, res, next) => {
    try {
        try {
            const updatedStatus = await Gym.updateOne(
                { _id: req.params.id },
                { $set: { status: req.body.status } }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: {
                        success: true,
                        updatedStatus,
                    },
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to update Status.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

updateGym = async (req, res, next) => {
    try {
        try {
            const updatedGym = await Gym.findByIdAndUpdate(req.params.id, req.body);
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: {
                        success: true,
                        updatedGym,
                    },
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to edit holiday.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

deactivateGym = async (req, res, next) => {
    try {
        try {
            const updatedStatus = await Gym.findByIdAndUpdate(
                req.params.id,
                { isActive: false },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: updatedStatus,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to update Gym status.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

// Method for getting the auto generated Gym Code
const getGymCode = async (req, res, next) => {
    try {
        const allClient = await Gym.find().select("gymCode");
        // find maximum client code present
        const maxGymCode = allClient.reduce((max, curr) => Math.max(max, curr.gymCode), 0);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS)
            .header("Authorization", req.header("Authorization"))
            .json({
                gymCode: maxGymCode + 1,
            });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getGym,
    addGym,
    getGymByCode,
    updateGymStatus,
    updateGym,
    getGymCode,
    deactivateGym,
};
