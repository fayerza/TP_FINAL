const db = require('../database/connection.js');

async function getMonsters(req, res) {
    try {
        const monsters = await db.query('SELECT Monster_id, Name, Img, Type, Description FROM monsters');
        return res.status(200).json(monsters.rows);
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function getOneMonster(req, res) {
    try {
        const result = await db.query(`
        SELECT
        m.monster_id,m.name ,m.img, m.description, m.wtr_res , m.fr_res, m.ice_res , m.drg_res ,m.elc_res ,m.type ,
        m.og_game ,m.difficulty ,
        r.region_id AS "region_id", r.name AS "region_name", r.img AS "region_img", 
        ma.Atk_id , ma.name AS "attack_name" , ma.dmg , ma.atk_element 
        FROM monsters m LEFT OUTER JOIN monsters_regions mr ON m.monster_id = mr.monster_id 
        LEFT OUTER JOIN regions r  ON mr.region_id = r.region_id 
        LEFT OUTER JOIN monster_atks ma ON ma.monster_id = m.monster_id 
        WHERE m.monster_id = $1;`, [req.params.id]);

        //rows.length is the amount of rows received
        if (result.rows.length === 0) {
            return res.status(404).send("Monster not found");
        }
        const row = result.rows[0];
        const monster = {
            id: row.monster_id,
            name: row.name,
            img: row.img,
            description: row.description,
            wtr_res: row.wtr_res,
            fr_res: row.fr_res,
            ice_res: row.ice_res,
            drg_res: row.drg_res,
            elc_res: row.elc_res,
            type: row.type,
            og_game: row.og_game,
            difficulty: row.difficulty,
            regions: [],
            attacks: []
        };

        const regionsSet = new Set();
        const attackSet = new Set();

        result.rows.forEach(r => {

            if (r.region_id !== null && !regionsSet.has(r.region_id)) {
                monster.regions.push({
                    id: r.region_id,
                    name: r.region_name,
                    img: r.region_img
                });
                regionsSet.add(r.region_id);
            }

            if (r.atk_id !== null && !attackSet.has(r.atk_id)) {
                monster.attacks.push({
                    id: r.atk_id,
                    name: r.attack_name,
                    dmg: r.dmg,
                    element: r.atk_element
                });
                attackSet.add(r.atk_id);
            }
        });

        return res.status(200).json(monster);
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function deleteMonster(req, res) {
    try {
        const result = await db.query('DELETE FROM Monsters WHERE Monster_id = $1', [req.params.id]);
        //rowCount is how many rows were affected
        if (result.rowCount === 0) {
            return res.status(404).send("Monster not found");
        }
        return res.status(204).send("Monster Deleted");
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function postMonster(req, res) {
    try {
        const data = req.body;
        const result = await db.query(`
            INSERT INTO Monsters
            (Name, Img, Description,Wtr_res,Fr_res,Ice_res,Drg_res,
            Elc_res,Type,Og_game,Difficulty)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING Monster_id`,
            [
                data.name,
                data.img,
                data.desc,
                data.wtr_res,
                data.fr_res,
                data.ice_res,
                data.drg_res,
                data.elc_res,
                data.type,
                data.game,
                data.difficulty
            ]
        );
        return res.status(201).json({ id: result.rows[0].monster_id });
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function updateMonster(req, res) {
    try {
        const data = req.body;
        const result = await db.query(`
            UPDATE Monsters
            SET Name = $1, Img = $2, Description = $3, Wtr_res = $4, Fr_res = $5, Ice_res = $6,
            Drg_res = $7, Elc_res = $8 , Type = $9 , Og_game = $10 , Difficulty = $11
            WHERE Monster_id = $12`,
            [
                data.name,
                data.img,
                data.desc,
                data.wtr_res,
                data.fr_res,
                data.ice_res,
                data.drg_res,
                data.elc_res,
                data.type,
                data.game,
                data.difficulty,
                req.params.id
            ]
        );
        if (result.rowCount === 0) {
            return res.status(404).send("Monster not found");
        }
        return res.status(200).send("Monster Updated");
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

module.exports = {
    getMonsters,
    getOneMonster,
    deleteMonster,
    postMonster,
    updateMonster
};