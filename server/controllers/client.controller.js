const Client = require("../models/client/client.model");

// App Error class
const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");

addClient = async (req, res, next) => {
    try {
        const clientDetails = req.body;
        const joiningStatus = {
            isActive: true,
            dateOfJoining: new Date(),
            membership: 0,
            membershipEnding: null,
        };

        const client = new Client({ ...clientDetails, ...joiningStatus });

        try {
            await client.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: client,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to add the client.",
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
            const allClients = await Client.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({ data: allClients });
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

getClientByCode = async (req, res, next) => {
    try {
        try {
            const client = await Client.findOne({ clientCode: req.params.clientCode });
            if (!client) {
                throw new AppError("No Client found.", HTTP_STATUS_CODE.NOT_FOUND);
            }
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: client,
                });
        } catch (error) {
            throw new AppError(
                `Unable to find the Client having code ${req.params.clientCode}.`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        next(error);
    }
};

deactivateClient = async (req, res, next) => {
    try {
        try {
            const updatedStatus = await Client.findByIdAndUpdate(
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
                    "Unable to update client status.",
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
            const updatedClient = await Client.findOneAndUpdate(
                { clientCode: req.params.clientCode },
                { $set: req.body },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    success: true,
                    data: updatedClient,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to update client.",
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
                { clientCode: req.params.clientCode },
                {
                    $push: { membershipHistory: { $each: [req.body], $position: 0 } },
                    $set: {
                        isActive: true,
                        membershipEnding: req.body.endDate,
                        membership: req.body.membership,
                    },
                },
                { new: true }
            );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: data,
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace("Error: ", ""),
                    HTTP_STATUS_CODE.BAD_REQUEST
                );
            } else
                throw new AppError(
                    "Unable to update Client Membership.",
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                );
        }
    } catch (error) {
        next(error);
    }
};

// Method for getting the auto generated Client Code
const getClientCode = async (req, res, next) => {
    try {
        const allClient = await Client.find().select("clientCode");
        // find maximum client code present
        const maxClientCode = allClient.reduce((max, curr) => Math.max(max, curr.clientCode), 0);
        return res
            .status(HTTP_STATUS_CODE.SUCCESS)
            .header("Authorization", req.header("Authorization"))
            .json({
                clientCode: maxClientCode + 1,
            });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getClient,
    addClient,
    getClientByCode,
    deactivateClient,
    updateClient,
    updateMembership,
    getClientCode,
};
