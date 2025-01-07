const express = require("express");
const router = express.Router();
const controller = require("../controllers/exampleController");

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.patch("/:id", controller.modify);
router.delete("/:id", controller.destroy);

module.exports = router;