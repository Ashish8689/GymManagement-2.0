const EquipmentModel = require("../../models/Equipments/equipment.model");
const EquipmentCategoryModel = require("../../models/Equipments/category.model");
const AppError = require("../../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../../utils/constants.utils");

getEquipment = async (req, res, next) => {
    try {
        try {
            const allEquipment = await EquipmentModel.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: allEquipment,
                });
        } catch (error) {
            throw new AppError(
                "Unable to fetch Equipment.",
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

getEquipmentByName = async (req, res, next) => {
    try {
        try {
            const allEquipment = await EquipmentModel.find();

            const Equipment = allEquipment.find((item) => item.equipment === req.params.equipment);

            if (Equipment) {
                return res
                    .status(HTTP_STATUS_CODE.SUCCESS)
                    .header("Authorization", req.header("Authorization"))
                    .json(Equipment);
            } else {
                throw new AppError(
                    `Unable to fetch Equipment ${req.params.equipment}.`,
                    HTTP_STATUS_CODE.NOT_FOUND
                );
            }
        } catch (error) {
            throw new AppError(
                `Unable to fetch Equipment ${req.params.equipment}.`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

addEquipment = async (req, res, next) => {
    try {
        const category = await EquipmentCategoryModel.findOne({ category: req.body.category });

        if (!category) {
            throw new AppError(
                `Unable to find category ${req.body.category}`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }

        const equipmentData = new EquipmentModel({
            ...req.body,
            category: {
                id: category._id,
                category: category.category,
                description: category.description,
            },
        });

        try {
            await equipmentData.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json(equipmentData);
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to add the Equipment.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

deleteEquipment = async (req, res, next) => {
    try {
        try {
            const updatedStatus = await EquipmentModel.findByIdAndUpdate(
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
                    "Unable to delete Equipment.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

updateEquipment = async (req, res, next) => {
    try {
        try {
            const updatedEquipment = await EquipmentModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    success: true,
                    data: updatedEquipment,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to update Equipment.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getEquipment,
    getEquipmentByName,
    addEquipment,
    deleteEquipment,
    updateEquipment,
};
