const router = require("express").Router();
const EquipmentController = require("../../controllers/Equipments/equipment.controller");

router.get("/", EquipmentController.getEquipment);
router.get("/:category", EquipmentController.getEquipmentByName);
router.post("/", EquipmentController.addEquipment);
router.put("/:id", EquipmentController.updateEquipment);
router.delete("/:id", EquipmentController.deleteEquipment);

module.exports = router;
