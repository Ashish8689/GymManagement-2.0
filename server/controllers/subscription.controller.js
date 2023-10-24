const SubscriptionModel = require("../models/subscription.model");

const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");

addSubscription = async (req, res, next) => {
    try {
        const subscriptionData = new SubscriptionModel(req.body);

        try {
            await subscriptionData.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: subscriptionData,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to add the subscription.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

getSubscription = async (req, res, next) => {
    try {
        try {
            const allSubscription = await SubscriptionModel.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({ data: allSubscription });
        } catch (error) {
            throw new AppError(
                "Unable to fetch Subscriptions.",
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

deleteSubscription = async (req, res, next) => {
    // need to work on delete functionality
    try {
        try {
            const updatedStatus = await SubscriptionModel.findByIdAndUpdate(
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
                    "Unable to delete subscription.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

updateSubscription = async (req, res, next) => {
    try {
        try {
            const updatedSubscription = await SubscriptionModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    success: true,
                    data: updatedSubscription,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to update subscription.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSubscription,
    addSubscription,
    updateSubscription,
    deleteSubscription,
};
