const express = require("express");
const router = express.Router();
const { postRelationship,deleteRelationship } = require("../controllers/monster_regions.js");

router.post('/:idRegion/:idMonster', postRelationship);
router.delete('/:idRegion/:idMonster', deleteRelationship);

module.exports = router;