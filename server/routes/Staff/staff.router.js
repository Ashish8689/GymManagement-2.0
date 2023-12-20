const router = require("express").Router();
const staffController = require("../../controllers/Staff/staff.controller");

router.get("/", staffController.getStaff);
router.get("/:staff", staffController.getStaffByName);
router.post("/", staffController.addStaff);
router.put("/:id", staffController.updateStaff);
router.delete("/:id", staffController.deleteStaff);

module.exports = router;