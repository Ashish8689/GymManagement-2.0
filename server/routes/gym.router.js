const router = require('express').Router();
const verifyTokenUtils = require('../utils/verify-token.utils');
const gymController = require('../controllers/gym.controller');

router.get('/', verifyTokenUtils , gymController.getGym);
router.get('/:id', verifyTokenUtils , gymController.getGymById);
router.post('/', verifyTokenUtils , gymController.addGym);
router.put('/:id', verifyTokenUtils , gymController.updateGym);
router.put('/updateStatus/:id', verifyTokenUtils ,gymController.updateGymStatus);

module.exports = router;
