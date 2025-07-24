const db = require('../database/connection.js');

async function getMonsterAttacks(req, res) {
  try {
    const monsterId = req.params.id;
    const attacks = await db.query(`
            SELECT ma.Atk_id, ma.name AS attack_name, ma.dmg, ma.atk_element, ma.type
            FROM monster_atks ma
            WHERE ma.monster_id = $1`, [monsterId]);

    if (attacks.rows.length === 0) {
      return res.status(404).send("No attacks found for this monster");
    }

    return res.status(200).json(attacks.rows);
  } catch (error) {
    console.error('Error: ', error);
    return res.sendStatus(500);
  }
}

async function getOneAttack(req, res) {
  try {
    const { id, attackId } = req.params;
    const attack = await db.query(`
            SELECT ma.Atk_id, ma.name AS attack_name, ma.dmg, ma.atk_element, ma.type
            FROM monster_atks ma
            WHERE ma.monster_id = $1 AND ma.atk_id = $2`, [id, attackId]);

    if (attack.rows.length === 0) {
      return res.status(404).send("Attack not found");
    }

    return res.status(200).json(attack.rows[0]);
  } catch (error) {
    console.error('Error: ', error);
    return res.sendStatus(500);
  }
}

async function postMonsterAttack(req, res) {
  try {
    const monsterId = req.params.id;
    const { atk_element, dmg, name, type } = req.body;

    if (!atk_element || !dmg || !name || !type) {
      return res.status(400).send("All fields are required");
    }

    const newAttack = await db.query(`
            INSERT INTO monster_atks (atk_element, dmg, name, monster_id, type)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`, [atk_element, dmg, name, monsterId, type]);

    return res.status(201).json(newAttack.rows[0]);
  } catch (error) {
    console.error('Error: ', error);
    return res.sendStatus(500);
  }
}

async function updateMonsterAttack(req, res) {
  try {
    const { id, attackId } = req.params;
    const { atk_element, dmg, name, type } = req.body;

    if (!atk_element || !dmg || !name) {
      return res.status(400).send("All fields are required");
    }

    const updatedAttack = await db.query(`
            UPDATE monster_atks
            SET atk_element = $1, dmg = $2, name = $3, type = $4
            WHERE atk_id = $5 AND monster_id = $6
            RETURNING *`, [atk_element, dmg, name, type, attackId, id]
    );

    if (updatedAttack.rows.length === 0) {
      return res.status(404).send("Attack not found");
    }

    return res.status(200).json(updatedAttack.rows[0]);
  } catch (error) {
    console.error('Error: ', error);
    return res.sendStatus(500);
  }
}

async function deleteMonsterAttack(req, res) {
  try {
    const { id, attackId } = req.params;

    const deletedAttack = await db.query(`
            DELETE FROM monster_atks
            WHERE atk_id = $1 AND monster_id = $2
            RETURNING *`, [attackId, id]);

    if (deletedAttack.rows.length === 0) {
      return res.status(404).send("Attack not found");
    }

    return res.status(200).json(deletedAttack.rows[0]);
  } catch (error) {
    console.error('Error: ', error);
    return res.sendStatus(500);
  }
}


module.exports = {
  getMonsterAttacks,
  postMonsterAttack,
  updateMonsterAttack,
  deleteMonsterAttack,
  getOneAttack
};