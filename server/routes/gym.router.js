const router = require("express").Router();
const verifyTokenUtils = require("../utils/verify-token.utils");
const gymController = require("../controllers/gym.controller");

router.get("/", gymController.getGym);
router.get("/gymCode", gymController.getGymCode);
router.get("/:gymCode", gymController.getGymByCode);
router.post("/", gymController.addGym);
router.put("/:gymCode", gymController.updateGym);
router.patch("/deactivate/:id", gymController.deactivateGym);
router.put("/updateStatus/:gymCode", verifyTokenUtils, gymController.updateGymStatus);

module.exports = router;
