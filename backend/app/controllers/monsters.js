const express = require('express');

const db = require('../database/connection.js');

async function getMonsters(req, res) {
    try {
        const monsters = await db.query('SELECT Monster_id, Name, Img, Type, Description FROM monsters');
        res.status(200).json(monsters.rows);
    } catch (error) {
        console.error('Error: ', error);
        res.sendStatus(500);
    }
}

async function getOneMonster(req, res) {
    try {
        const result = await db.query('SELECT * FROM monsters m LEFT OUTER JOIN monsters_regions mr ON m.monster_id = mr.monster_id LEFT OUTER JOIN regions r  ON mr.region_id = r.region_id LEFT OUTER JOIN WHERE m.monster_id = $1;', [req.params.id]);
        if (result.rows.length === 0) {
            res.statusMessage = 'Monster not found';
            return res.sendStatus(404);
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error: ', error);
        res.sendStatus(500);
    }
}

module.exports = {
    getMonsters,
    getOneMonster
};