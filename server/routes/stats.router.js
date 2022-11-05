const router = require("express").Router();

const statsController = require("../controllers/stats.controller");

router.get("/", statsController.overAllStats);

module.exports = router;
