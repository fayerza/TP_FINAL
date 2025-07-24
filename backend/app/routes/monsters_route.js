const express = require("express");
const router = express.Router();
const { getMonsters,getOneMonster,deleteMonster,postMonster,updateMonster } = require("../controllers/monsters.js");
const { getMonsterAttacks, getOneAttack, postMonsterAttack, updateMonsterAttack, deleteMonsterAttack } = require("../controllers/monstersAttacks.js");

router.get("/", getMonsters);
router.get("/:id",getOneMonster);
router.delete("/:id",deleteMonster);
router.post("/",postMonster);
router.put("/:id",updateMonster);

// monster attacks 
router.get("/:id/attacks", getMonsterAttacks);
router.get("/:id/attacks/:attackId", getOneAttack); 
router.post("/:id/attacks", postMonsterAttack);
router.put("/:id/attacks/:attackId", updateMonsterAttack);
router.delete("/:id/attacks/:attackId", deleteMonsterAttack);

module.exports = router;