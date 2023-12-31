const StaffModel = require("../../models/Staff/staff.model");
const AppError = require("../../utils/app-error.utils");
const { extractUserDataFromToken } = require("../../utils/common.utils");
const { HTTP_STATUS_CODE } = require("../../utils/constants.utils");

// Method for getting the auto generated Employee Code
const getEmployeeCode = async (req, res, next) => {
    try {
        const allEmployee = await StaffModel.find().select("employeeCode");
        // find maximum client code present
        const maxEmployeeCode = allEmployee.reduce(
            (max, curr) => Math.max(max, curr.employeeCode),
            0
        );
        return res
            .status(HTTP_STATUS_CODE.SUCCESS)
            .header("Authorization", req.header("Authorization"))
            .json({
                employeeCode: maxEmployeeCode + 1,
            });
    } catch (error) {
        next(error);
    }
};

const getStaff = async (req, res, next) => {
    try {
        try {
            const allStaff = await StaffModel.find({ isActive: req.query.status === "active" });
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

const getStaffByEmployeeId = async (req, res, next) => {
    try {
        try {
            const staff = await StaffModel.findOne({ employeeCode: req.params.employeeCode });

            if (staff) {
                return res
                    .status(HTTP_STATUS_CODE.SUCCESS)
                    .header("Authorization", req.header("Authorization"))
                    .json(staff);
            } else {
                throw new AppError(
                    `Unable to fetch Staff by ${req.params.employeeCode}.`,
                    HTTP_STATUS_CODE.NOT_FOUND
                );
            }
        } catch (error) {
            throw new AppError(
                `Unable to fetch Staff by ${req.params.employeeCode}.`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

const addStaff = async (req, res, next) => {
    try {
        const loginUserData = await extractUserDataFromToken(req);

        const systemFields = {
            addedBy: loginUserData.username,
            updatedBy: loginUserData.username,
        };

        const staffData = new StaffModel({ ...req.body, ...systemFields });

        try {
            await staffData.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: staffData,
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

const deleteStaff = async (req, res, next) => {
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

const updateStaff = async (req, res, next) => {
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

const updateStaffRole = async (req, res, next) => {
    try {
        try {
            req.body.id.forEach(async (id) => {
                const data = await StaffModel.findOneAndUpdate(
                    { _id: id },
                    { $set: { isAdmin: true } },
                    { new: true }
                );
            });

            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    success: true,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to update Staff Role.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStaff,
    getEmployeeCode,
    getStaffByEmployeeId,
    addStaff,
    deleteStaff,
    updateStaff,
    updateStaffRole,
};
