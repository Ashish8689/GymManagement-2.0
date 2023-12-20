const StaffDepartmentModel = require("../../models/Staff/staffDepartment.model");
const AppError = require("../../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../../utils/constants.utils");

getStaffDepartment = async (req, res, next) => {
    try {
        try {
            const allDepartments = await StaffDepartmentModel.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: allDepartments,
                });
        } catch (error) {
            throw new AppError(
                "Unable to fetch Department.",
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

addStaffDepartment = async (req, res, next) => {
    try {
        const departmentData = new StaffDepartmentModel(req.body);

        try {
            await departmentData.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({ data: departmentData });
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

deleteStaffDepartment = async (req, res, next) => {
    try {
        try {
            const deleteDepartment = await StaffDepartmentModel.findByIdAndDelete(req.params.id);
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json(deleteDepartment);
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

updateStaffDepartment = async (req, res, next) => {
    try {
        try {
            const updatedDepartment = await StaffDepartmentModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    success: true,
                    data: updatedDepartment,
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
    getStaffDepartment,
    addStaffDepartment,
    deleteStaffDepartment,
    updateStaffDepartment,
};
