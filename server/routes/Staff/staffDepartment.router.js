const router = require("express").Router();
const staffDepartmentController = require("../../controllers/Staff/staffDepartment.controller");

router.get("/", staffDepartmentController.getStaffDepartment);
router.post("/", staffDepartmentController.addStaffDepartment);
router.put("/:id", staffDepartmentController.updateStaffDepartment);
router.delete("/:id", staffDepartmentController.deleteStaffDepartment);

module.exports = router;
