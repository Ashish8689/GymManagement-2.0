const router = require('express').Router();
const verifyTokenUtils = require('../utils/verify-token.utils');
const TrainerController = require('../controllers/trainer.controller');

router.get('/', verifyTokenUtils, TrainerController.getTrainer);
router.get('/:id', verifyTokenUtils, TrainerController.getTrainerById);
router.post('/', verifyTokenUtils, TrainerController.addTrainer);
router.put('/:id', verifyTokenUtils, TrainerController.updateTrainer);

module.exports = router;
