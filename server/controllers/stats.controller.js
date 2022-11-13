const Client = require("../models/client/client.model");
const Trainer = require("../models/trainer.model");
const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");

dashboardStats = async (req, res, next) => {
    try {
        try {
            const clients = await Client.find();
            const trainers = await Trainer.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: {
                        clients: clients.length,
                        trainers: trainers.length,
                        equipments: 0,
                        clientsJoin: 0,
                    },
                });
        } catch (err) {
            throw new AppError("Unable to fetch Stats", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        next(error);
    }
};

clientStats = async (req, res, next) => {
    try {
        try {
            const clients = await Client.find();
            const clientStats = clients.reduce(
                (acc, cv) => {
                    if (cv.isActive) {
                        return { ...acc, active: acc.active + 1 };
                    } else {
                        return { ...acc, inActive: acc.inActive + 1 };
                    }
                },
                { active: 0, inActive: 0 }
            );

            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: {
                        totalClients: clients.length,
                        activeClients: clientStats.active,
                        inActiveClients: clientStats.inActive,
                        clientsJoin: 0,
                    },
                });
        } catch (err) {
            throw new AppError("Unable to fetch Stats", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        next(error);
    }
};

trainerStats = async (req, res, next) => {
    try {
        try {
            const trainers = await Trainer.find();
            const trainerStats = trainers.reduce(
                (acc, cv) => {
                    if (cv.isActive) {
                        return { ...acc, active: acc.active + 1 };
                    } else {
                        return { ...acc, inActive: acc.inActive + 1 };
                    }
                },
                { active: 0, inActive: 0 }
            );

            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header("Authorization", req.header("Authorization"))
                .json({
                    data: {
                        clientsActive: trainerStats.active,
                        clientsInActive: trainerStats.inActive,
                        totalTrainers: trainers.length,
                        trainersJoin: 0,
                    },
                });
        } catch (err) {
            throw new AppError("Unable to fetch Stats", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    dashboardStats,
    clientStats,
    trainerStats,
};
