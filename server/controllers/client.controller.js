const Client = require("../models/client/client.model");

// App Error class
const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");

addClient = async (req, res, next) => {
    try {
        try {
            const member = new Client({ ...req.body });
            await member.save();
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
                    "Unable to add the Client.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

getClient = async (req, res, next) => {
    try {
        try {
            const member = await Client.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: {
                        member,
                    },
                });
        } catch (error) {
            throw new AppError(
                "Unable to fetch all Clients.",
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

getClientById = async (req, res, next) => {
    try {
        const member = await Client.findById(req.params.id);
        res.json(member);
    } catch (err) {
        res.json({ message: err });
    }

    try {
        try {
            const member = await Client.findOne(req.params.id);
            if (!member) {
                throw new AppError("No Client found.", HTTP_STATUS_CODE.NOT_FOUND);
            }
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: member,
                });
        } catch (error) {
            throw new AppError(
                `Unable to find the employee ${req.params.id}.`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

updateClientStatus = async (req, res, next) => {
    try {
        try {
            const updatedStatus = await Client.updateOne(
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

updateClient = async (req, res, next) => {
    try {
        try {
            const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body);
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: {
                        success: true,
                        updatedClient,
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

updateMembership = async (req, res, next) => {
    try {
        try {
            const data = await Client.updateOne(
                { _id: req.params.id },
                {
                    $push: { membershipHistory: { $each: [req.body], $position: 0 } },
                    $set: {
                        status: true,
                        endDate: req.body.endDate,
                        membership: req.body.membership,
                    },
                },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: {
                        success: true,
                        data,
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
                    "Unable to update Clientship.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getClient,
    addClient,
    getClientById,
    updateClientStatus,
    updateClient,
    updateMembership,
};
