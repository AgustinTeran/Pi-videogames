const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var videogames = require("./videoGames")
var genres = require("./genres")
var plataforms = require("./plataforms")

const router = Router();

var {conn} = require("../db")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames",videogames)
router.use("/genres",genres)
router.use("/plataforms",plataforms)

router.get('/test', (req, res) => {
  res.send('Api is working');
});

router.get('/test2', async(req, res) => {
  try {
    const [results] = await conn.query(`
      SELECT pg_database_size(current_database()) / 1024 / 1024 AS size_in_mb;
    `);
    // console.log('Database size (MB):', results[0].size_in_mb);
    
    // delay
    // await new Promise(resolve => setTimeout(() => {resolve()}, 3000));
    
    res.send(`Database size: ${results[0].size_in_mb} MB`);
  } catch (error) {
    res.send('Error getting database size');
  }
});

module.exports = router;
