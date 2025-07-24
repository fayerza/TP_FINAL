const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000;

const monstersRoutes= require('./app/routes/monsters_route.js');
const regionRoutes = require('./app/routes/regions_route.js');
const weaponsRoutes = require('./app/routes/weapons_route.js');
const monsterRegionsRelationship = require('./app/routes/monsterRegions_route.js');

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use("/api/v1/monsters",monstersRoutes);
app.use("/api/v1/regions",regionRoutes);
app.use("/api/v1/weapons",weaponsRoutes);
app.use("/api/v1/monsters_regions",monsterRegionsRelationship);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})