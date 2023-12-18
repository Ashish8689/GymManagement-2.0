const router = require("express").Router();
const CategoryController = require("../controllers/Equipments/category.controller");

router.get("/", CategoryController.getCategory);
router.get("/:category", CategoryController.getCategoryByName);
router.post("/", CategoryController.addCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
