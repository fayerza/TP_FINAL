const express = require('express');
const app = express();
const port = 5000;

const monstersRoutes= require('./app/routes/monsters_route.js');
const regionRoutes = require('./app/routes/regions_route.js');

app.use(express.json());
app.use("/api/v1/monsters",monstersRoutes);
app.use("/api/v1/regions",regionRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})