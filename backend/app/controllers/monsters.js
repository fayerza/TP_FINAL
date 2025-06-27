const express = require('express');

const db = require('../database/connection.js');

async function getMonsters(req,res) {
    const monsters=await db.query('SELECT * FROM Monsters');
    res.json(monsters.rows);
}

module.exports={
    getMonsters
};