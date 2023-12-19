const EquipmentCategoryModel = require("../../models/Equipments/category.model");
const AppError = require("../../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../../utils/constants.utils");

getCategory = async (req, res, next) => {
    try {
        try {
            const allCategory = await EquipmentCategoryModel.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: allCategory,
                });
        } catch (error) {
            throw new AppError("Unable to fetch Category.", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        next(error);
    }
};

getCategoryByName = async (req, res, next) => {
    try {
        try {
            const allCategory = await EquipmentCategoryModel.find();

            const category = allCategory.find((item) => item.category === req.params.category);

            if (category) {
                return res
                    .status(HTTP_STATUS_CODE.SUCCESS)
                    .header("Authorization", req.header("Authorization"))
                    .json(category);
            } else {
                throw new AppError(
                    `Unable to fetch Category ${req.params.category}.`,
                    HTTP_STATUS_CODE.NOT_FOUND
                );
            }
        } catch (error) {
            throw new AppError(
                `Unable to fetch Category ${req.params.category}.`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

addCategory = async (req, res, next) => {
    try {
        const categoryData = new EquipmentCategoryModel(req.body);

        try {
            await categoryData.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: categoryData,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to add the Category.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

deleteCategory = async (req, res, next) => {
    try {
        try {
            const deleteCategory = await EquipmentCategoryModel.findByIdAndDelete(req.params.id);
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json(deleteCategory);
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to delete Category.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

updateCategory = async (req, res, next) => {
    try {
        try {
            const updatedCategory = await EquipmentCategoryModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    success: true,
                    data: updatedCategory,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to update Category.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCategory,
    getCategoryByName,
    addCategory,
    deleteCategory,
    updateCategory,
};
