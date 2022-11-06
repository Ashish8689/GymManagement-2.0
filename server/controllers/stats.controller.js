const Client = require("../models/client/client.model");
const Trainer = require("../models/trainer.model");
const AppError = require("../utils/app-error.utils");
const { HTTP_STATUS_CODE } = require("../utils/constants.utils");

overAllStats = async (req, res, next) => {
    try {
        try {
            const clients = await Client.find();
            const trainers = await Trainer.find();
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
                        clientsActive: clientStats.active,
                        clientsInActive: clientStats.inActive,
                        totalTrainers: trainers.length,
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
    overAllStats,
};
