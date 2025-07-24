const { Pool } = require('pg');
 
const db = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'postgres',
  port: 5432,
  database: 'monsterHunter_DB',
});

module.exports = db;