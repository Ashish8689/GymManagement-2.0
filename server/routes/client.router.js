const router = require("express").Router();
const verifyTokenUtils = require("../utils/verify-token.utils");
const ClientController = require("../controllers/client.controller");

router.get("/", ClientController.getClient);
router.get("/clientCode", ClientController.getClientCode);
router.get("/deactivatingClient", ClientController.getDeactivatingClientWeek);
router.get("/:clientCode", ClientController.getClientByCode);
router.post("/", ClientController.addClient);
router.put("/:clientCode", ClientController.updateClient);
router.patch("/deactivate/:id", ClientController.deactivateClient);
router.put("/updateMembership/:clientCode", ClientController.updateMembership);

module.exports = router;
