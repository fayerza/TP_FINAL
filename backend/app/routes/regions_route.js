const express = require("express");
const router = express.Router();
const { getRegions, getOneRegion, postRegion, deleteRegion, updateRegion } = require("../controllers/regions.js");

router.get("/", getRegions);
router.get("/:id", getOneRegion);
router.post("/", postRegion);
router.delete("/:id", deleteRegion);
router.put("/:id", updateRegion);

module.exports = router;