const db = require('../database/connection.js');

async function postRelationship(req,res) {
    try{
        const result = await db.query(`INSERT INTO monsters_regions (region_id,monster_id) VALUES ($1,$2)`,[req.params.idRegion,req.params.idMonster]);
        return res.status(201).send("Relationship Created");
    }catch(error){
        console.error('Error: ',error);
        return res.sendStatus(500);
    }
}

async function deleteRelationship(req,res) {
    try{
        const result = await db.query(`DELETE FROM monsters_regions WHERE Region_id = $1 AND Monster_id = $2`,[req.params.idRegion,req.params.idMonster]);
        if(result.rowCount===0){
            return res.status(404).send("Relationship not found");
        }
        return res.status(204);
    }catch(error){
        console.error('Error: ',error);
        return res.sendStatus(500);
    }
}

module.exports = {
    postRelationship,
    deleteRelationship
}