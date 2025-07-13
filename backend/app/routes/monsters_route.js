const express = require("express");
const router = express.Router();
const { getMonsters } = require("../controllers/monsters.js");

router.get("/monsters", getMonsters);

module.exports = router;