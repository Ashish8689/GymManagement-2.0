const router = require("express").Router();
// const verifyTokenUtils = require("../utils/verify-token.utils");
const TrainerController = require("../controllers/trainer.controller");

router.get("/", TrainerController.getTrainer);
router.get("/trainerCode", TrainerController.getTrainerCode);
router.get("/:trainerCode", TrainerController.getTrainerByCode);
router.post("/", TrainerController.addTrainer);
router.put("/:trainerCode", TrainerController.updateTrainer);
router.patch("/deactivate/:id", TrainerController.deactivateTrainer);

module.exports = router;
