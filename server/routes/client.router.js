const router = require("express").Router();
const verifyTokenUtils = require("../utils/verify-token.utils");
const ClientController = require("../controllers/client.controller");

router.get("/", ClientController.getClient);
router.get("/:id", ClientController.getClientById);
router.post("/", ClientController.addClient);
router.put("/:id", ClientController.updateClient);
router.put("/updateStatus/:id", ClientController.updateClientStatus);
router.put("/updateMembership/:id", verifyTokenUtils, ClientController.updateMembership);

module.exports = router;
