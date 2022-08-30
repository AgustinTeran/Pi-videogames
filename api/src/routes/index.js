const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var videogames = require("./videoGames")
var genres = require("./genres")
var plataforms = require("./plataforms")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames",videogames)
router.use("/genres",genres)
router.use("/plataforms",plataforms)

module.exports = router;
