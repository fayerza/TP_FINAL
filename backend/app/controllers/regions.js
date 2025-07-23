const db = require('../database/connection.js');

async function getRegions(req, res) {
    try {
        const regions = await db.query('SELECT Region_id, Name, Img, Description FROM Regions');
        return res.status(200).json(regions.rows);
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function getOneRegion(req, res) {
    try {
        const result = await db.query(`
            SELECT r.* , m.monster_id AS "monster_id" , m.name AS "monster_name" , m.img AS "monster_img" FROM regions r 
            LEFT OUTER JOIN monsters_regions mr ON mr.region_id = r.region_id 
            LEFT JOIN monsters m ON m.monster_id =mr.monster_id 
            WHERE r.region_id =$1;`, [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Region not found");
        }
        const row = result.rows[0];
        const region = {
            id: row.region_id,
            name: row.name,
            img: row.img,
            weather: row.weather,
            description: row.description,
            areas: row.num_areas,
            game: row.og_game,
            monsters: []
        };
        const monsterSet = new Set();

        result.rows.forEach(r => {
            if (r.monster_id !== null && !monsterSet.has(r.monster_id)) {
                region.monsters.push({
                    id: r.monster_id,
                    name: r.monster_name,
                    img: r.monster_img
                });
                monsterSet.add(r.monster_id);
            }
        });
        return res.status(200).json(region);
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function postRegion(req, res) {
    try {
        const data = req.body;
        const result = await db.query(
            `INSERT INTO Regions 
            (Name, Img, Weather, Description, Num_Areas, Og_game)
            VALUES ($1,$2,$3,$4,$5,$6) RETURNING Region_id`,
            [
                data.name,
                data.img,
                data.weather,
                data.description,
                data.num_areas,
                data.og_game
            ]
        );
        return res.status(200).json({ id: result.rows[0].region_id });
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function deleteRegion(req, res) {
    try {
        const result = await db.query("DELETE FROM Regions WHERE Region_id = $1", [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).send("Region not found");
        }
        return res.status(204).send("Region Deleted");
    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

async function updateRegion(req, res) {
    try {
        const data = req.body;
        const result = await db.query(
            `UPDATE Regions SET 
            Name = $1, Img = $2 , Weather = $3, Description = $4,
            Num_Areas = $5, Og_game = $6 WHERE Region_id = $7`,
            [
                data.name,
                data.img,
                data.weather,
                data.description,
                data.num_areas,
                data.og_game,
                req.params.id
            ]
        );
        if (result.rowCount === 0) {
            return res.status(404).send("Region not found");
        }
        return res.status(200).send("Region Updated");

    } catch (error) {
        console.error('Error: ', error);
        return res.sendStatus(500);
    }
}

module.exports = {
    getRegions,
    getOneRegion,
    postRegion,
    deleteRegion,
    updateRegion
};