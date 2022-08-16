var express = require("express")
var router = express.Router()
var {conn,Videogame} = require("../db")

router.get("/", async(req,res) => {
    try{
        var arrGames = await Videogame.findAll()
        res.send(arrGames)
    }catch(e){
        res.send("Cannot bring the games")
    }
})

router.post("/",async(req,res) => {
    try {
        var {name,description,released,rating,plataforms,genres} = req.body
       await conn.models.Videogame.create({
            name,description,released,rating,plataforms
        })
        res.send("Se creo el juego con exito")
    } catch (error) {
        res.status(400).send("No se pudo crear el juego")
    }
})


module.exports = router