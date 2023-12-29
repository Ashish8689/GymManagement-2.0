const router = require("express").Router();
const staffController = require("../../controllers/Staff/staff.controller");

router.get("/", staffController.getStaff);
router.get("/employeeCode", staffController.getEmployeeCode);
router.get("/:employeeCode", staffController.getStaffByEmployeeId);
router.post("/", staffController.addStaff);
router.put("/:id", staffController.updateStaff);
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
