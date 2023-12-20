const StaffModel = require("../../models/Staff/staff.model");
const AppError = require("../../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../../utils/constants.utils");

getStaff = async (req, res, next) => {
    try {
        try {
            const allStaff = await StaffModel.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: allStaff,
                });
        } catch (error) {
            throw new AppError("Unable to fetch Staff.", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        next(error);
    }
};

getStaffByName = async (req, res, next) => {
    try {
        try {
            const allStaff = await StaffModel.find();

            const Staff = allStaff.find((item) => item.Staff === req.params.Staff);

            if (Staff) {
                return res
                    .status(HTTP_STATUS_CODE.SUCCESS)
                    .header("Authorization", req.header("Authorization"))
                    .json(Staff);
            } else {
                throw new AppError(
                    `Unable to fetch Staff ${req.params.Staff}.`,
                    HTTP_STATUS_CODE.NOT_FOUND
                );
            }
        } catch (error) {
            throw new AppError(
                `Unable to fetch Staff ${req.params.Staff}.`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

addStaff = async (req, res, next) => {
    try {
        const StaffData = new StaffModel(req.body);

        try {
            await StaffData.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: StaffData,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to add the Staff.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

deleteStaff = async (req, res, next) => {
    try {
        try {
            const deleteStaff = await StaffModel.findByIdAndDelete(req.params.id);
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json(deleteStaff);
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to delete Staff.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

updateStaff = async (req, res, next) => {
    try {
        try {
            const updatedStaff = await StaffModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    success: true,
                    data: updatedStaff,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to update Staff.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStaff,
    getStaffByName,
    addStaff,
    deleteStaff,
    updateStaff,
};
