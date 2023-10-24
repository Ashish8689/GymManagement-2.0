const router = require("express").Router();
const SubscriptionController = require("../controllers/subscription.controller");

router.get("/", SubscriptionController.getSubscription);
router.post("/", SubscriptionController.addSubscription);
router.put("/:id", SubscriptionController.updateSubscription);
router.delete("/:id", SubscriptionController.deleteSubscription);

module.exports = router;
