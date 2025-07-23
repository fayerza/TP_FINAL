const express = require("express");
const router = express.Router();
const { getWeapons, getOneWeapon, postWeapon, updateWeapon,deleteWeapon } = require("../controllers/weapons.js");

router.get('/', getWeapons);
router.get('/:id', getOneWeapon);
router.post('/',postWeapon);
router.put('/:id',updateWeapon);
router.delete('/:id',deleteWeapon);

module.exports = router;