const router = require("express").Router();
const statsController = require("../controllers/stats.controller");

router.get("/dashboard", statsController.dashboardStats);
router.get("/client", statsController.clientStats);
router.get("/trainer", statsController.trainerStats);

module.exports = router;
