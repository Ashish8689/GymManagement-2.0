const Trainer = require('../models/trainer.model');
const AppError = require('../utils/app-error.utils');
const { HTTP_STATUS_CODE } = require('../utils/constants.utils');


addTrainer = async (req, res, next) => {
    try {
        try {
            const trainerObject = req.body;
            const trainer = new Trainer({ ...trainerObject });

            // Saving the trainer in the db.
            await trainer.save();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header('Authorization', req.header('Authorization'))
                .json({
                    data: {
                        success: true,
                    },
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace('Error: ', ''),
                    HTTP_STATUS_CODE.BAD_REQUEST,
                );
            } else
                throw new AppError(
                    'Unable to add the Trainer.',
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
                );
        }
    } catch (error) {
        next(error);
    }
};

getTrainer = async (req, res, next) => {
    try {
        try {
            const trainer = await Trainer.find();
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header('Authorization', req.header('Authorization'))
                .json({
                    data: {
                        trainer,
                    },
                });
        } catch (error) {
            throw new AppError(
                'Unable to fetch all Trainers.',
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            );
        }
    } catch (error) {
        next(error);
    }
};


getTrainerById = async (req, res, next) => {
    // try{
    //     const trainer = await Trainer.findById(req.params.id);
    //     res.json(trainer);

    // }
    // catch(err){
    //     res.json({message:err});
    // }

    try {
        try {
            const trainer = await Trainer.findOne(req.params.id);
            if (!trainer) {
                throw new AppError('No Trainer found.', HTTP_STATUS_CODE.NOT_FOUND);
            }
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header('Authorization', req.header('Authorization'))
                .json({
                    data: trainer,
                });
        } catch (error) {
            throw new AppError(
                `Unable to find the employee ${req.params.id}.`,
                HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
            );
        }
    } catch (error) {
        next(error);
    }
};


updateTrainer = async (req, res, next) => {
    try {
        try {
            const updatedTrainer = await Trainer.findByIdAndUpdate( req.params.id,  req.body );
            return res
                .status(HTTP_STATUS_CODE.SUCCESS)
                .header('Authorization', req.header('Authorization'))
                .json({
                    data: {
                        success: true,
                        updatedTrainer,
                    },
                });
        } catch (error) {
            if (error.status === 400) {
                throw new AppError(
                    error.toString().replace('Error: ', ''),
                    HTTP_STATUS_CODE.BAD_REQUEST,
                );
            } else
                throw new AppError(
                    'Unable to Update Trainer.',
                    HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
                );
        }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getTrainer,
    addTrainer,
    getTrainerById,
    updateTrainer,
};
