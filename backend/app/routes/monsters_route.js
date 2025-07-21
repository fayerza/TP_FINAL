const express = require("express");
const router = express.Router();
const { getMonsters,getOneMonster,deleteMonster,postMonster,updateMonster } = require("../controllers/monsters.js");

router.get("/", getMonsters);
router.get("/:id",getOneMonster);
router.delete("/:id",deleteMonster);
router.post("/",postMonster);
router.put("/:id",updateMonster);

module.exports = router;