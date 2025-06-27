const express = require("express");
const router = express.Router();
const { getMonsters } = require("../controllers/monsters.js");

router.get("/", getMonsters);

module.exports = router;