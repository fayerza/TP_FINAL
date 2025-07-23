const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000;
const monstersRoutes= require('./app/routes/monsters_route.js');

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use("/api/v1/monsters", monstersRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})