const Trainer = require("../models/trainer.model");
const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");

addTrainer = async (req, res, next) => {
    try {
        try {
            const joiningStatus = {
                isActive: true,
                dateOfJoining: new Date(),
            };
            const trainer = new Trainer({ ...req.body, ...joiningStatus });

            // Saving the trainer in the db.
            await trainer.save();
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
                    "Unable to add the Trainer.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

getTrainer = async (req, res, next) => {
    try {
        try {
            const trainer = await Trainer.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: trainer,
                });
        } catch (error) {
            throw new AppError(
                "Unable to fetch all Trainers.",
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

getTrainerByCode = async (req, res, next) => {
    try {
        try {
            const trainer = await Trainer.findOne({ trainerCode: req.params.trainerCode });
            if (!trainer) {
                throw new AppError("No Trainer found.", HTTP_STATUS_CODE.NOT_FOUND);
            }
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: trainer,
                });
        } catch (error) {
            throw new AppError(
                `Unable to find the trainer ${req.params.trainerCode}.`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

updateTrainer = async (req, res, next) => {
    try {
        try {
            const updatedTrainer = await Trainer.findOneAndUpdate(
                { trainerCode: req.params.trainerCode },
                { $set: req.body },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    success: true,
                    data: updatedTrainer,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to Update Trainer.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

// Method for getting the auto generated Trainer Code
const getTrainerCode = async (req, res, next) => {
    try {
        const allTrainer = await Trainer.find().select("trainerCode");
        // find maximum trainer code present
        const maxTrainerCode = allTrainer.reduce((max, curr) => Math.max(max, curr.trainerCode), 0);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS)
            .header("Authorization", req.header("Authorization"))
            .json({
                trainerCode: maxTrainerCode + 1,
            });
    } catch (error) {
        next(error);
    }
};

deactivateTrainer = async (req, res, next) => {
    try {
        try {
            const updatedStatus = await Trainer.findByIdAndUpdate(
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
                    "Unable to Update Trainer Status.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTrainer,
    getTrainerCode,
    addTrainer,
    getTrainerByCode,
    updateTrainer,
    deactivateTrainer,
};
