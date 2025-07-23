const db = require('../database/connection.js');

async function getWeapons(req, res) {
    try {
        const wpns = await db.query('SELECT * FROM Weapons');
        return res.status(200).json(wpns.rows);
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function getOneWeapon(req, res) {
    try {
        const result = await db.query(`
            SELECT w.*, a.attack_id, a.name, a.description, a.type AS "atk_type" FROM weapons w 
            LEFT OUTER JOIN weapons_attacks wa ON wa.weapon_id  = w.weapon_id 
            LEFT JOIN attacks a ON wa.attack_id = a.attack_id 
            WHERE w.weapon_id = $1;`
            , [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Weapon not found');
        }
        const row = result.rows[0];
        const wpn = {
            id: row.weapon_id,
            type: row.type,
            img: row.img,
            element: row.element,
            affinity: row.affinity,
            dmg: row.dmg,
            elem_dmg: row.elem_dmg,
            sharpness: row.sharpness,
            rarity: row.rarity,
            attacks: []
        };
        const attacksSet = new Set();
        result.rows.forEach(r => {
            if (r.attack_id !== null && !attacksSet.has(r.attack_id)) {
                wpn.attacks.push({
                    id: r.attack_id,
                    name: r.name,
                    description: r.description,
                    type: r.atk_type
                });
                attacksSet.add(r.attack_id);
            }
        });

        return res.status(200).json(wpn);
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function postWeapon(req, res) {
    try {
        const data = req.body;
        const result = await db.query(`
            INSERT INTO Weapons 
            (Type,Img,Element,Affinity,Dmg,Elem_dmg,Sharpness,Rarity)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING Weapon_id`,
            [
                data.type,
                data.img,
                data.element,
                data.affinity,
                data.dmg,
                data.elem_dmg,
                data.sharpness,
                data.rarity
            ]
        );
        return res.status(200).json({ id: result.rows[0].weapon_id });
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function updateWeapon(req, res) {
    try {
        const data = req.body;
        const result = await db.query(`
            UPDATE Weapons 
            SET Type = $1,Img = $2,Element = $3,Affinity = $4,Dmg = $5,
            Elem_dmg = $6,Sharpness = $7,Rarity = $8
            WHERE Weapon_id = $9`,
            [
                data.type,
                data.img,
                data.element,
                data.affinity,
                data.dmg,
                data.elem_dmg,
                data.sharpness,
                data.rarity,
                req.params.id
            ]
        );
        if (result.rowCount === 0) {
            return res.status(404).send('Weapon not found');
        }
        return res.status(200).send('Weapon updated');
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function deleteWeapon(req, res) {
    try {
        const result = await db.query('DELETE FROM Weapons WHERE Weapon_id = $1', [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).send("Weapon not found");
        }
        return res.status(204).send("Weapon Deleted");
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

module.exports = {
    getWeapons,
    getOneWeapon,
    postWeapon,
    updateWeapon,
    deleteWeapon
};