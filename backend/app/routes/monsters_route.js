const express = require("express");
const router = express.Router();
const { getMonsters,getOneMonster } = require("../controllers/monsters.js");

router.get("/", getMonsters);
router.get("/:id",getOneMonster);

module.exports = router;