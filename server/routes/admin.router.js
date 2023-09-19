const router = require("express").Router();
const AdminController = require("../controllers/admin.controller");

router.post("/", AdminController.addAdmin);

module.exports = router;
