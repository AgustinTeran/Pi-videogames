require('dotenv').config();
const {
    API_KEY
  } = process.env;

var express = require("express")
const { bindComplete } = require("pg-protocol/dist/messages")
var router = express.Router()
var {Videogame, conn, Op} = require("../db")
var axios = require("axios")
var {buscadora} = require("../funciones")

var Cache = [] // Para no estar haciendo pedidos a la api todo el tiempo, lo hago 1 vez y listo
var cantidadGamesDb = ""
router.get("/", async(req,res) => {
    try{
        var {name} = req.query

        if(!Cache.length || await Videogame.count() !== cantidadGamesDb){
            cantidadGamesDb = await Videogame.count()
            var gamesDB = await conn.models.Videogame.findAll({
                attributes: ["id","name","background_image","rating"],
                include: [{
                    attributes: ["name"],
                    model: conn.models.Genres
                }]
               })
               gamesDB = gamesDB.map(e => {return {id: e.id,name: e.name,rating: e.rating, background_image: e.background_image, genres: e.genres.map(genre => genre.name)}})
               
               
               var gamesAPI = []
        
               let i = 1
               if(!gamesAPI.length){
                while(i < 6){
                    var arr = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
                     .then(res => res.data.results.map(e => {
                        e.platforms.map(p => conn.models.Plataforms.findOrCreate({
                            where:{name: p.platform.name}
                        }))
                        return {id: e.id, name: e.name, rating:e.rating, background_image: e.background_image,genres: e.genres.map(e => e.name)}}))
                     gamesAPI = [...gamesAPI, ...arr]
                     i++
                    }
               }
            //    console.log("Me muestro solo si es el primer request que me hacen");
             Cache = [...gamesDB,...gamesAPI]
        }

        // console.log("Me muestro siempre");
 
       if(!name){
        res.send(Cache)
       } else {
        //  funcion para filtrar importada desde funciones.js
           res.send(buscadora(Cache,name)) 
       }
    }catch(e){
        res.send("Cannot bring the games")
    }
})

router.get("/:id",async(req,res) => {
    try{
        var {id} = req.params
        if(!Number(id)){
            var videogame = await conn.models.Videogame.findByPk(id,{
                include:[{
                    attributes: ["name"],
                    model: conn.models.Genres
                },{
                    attributes: ["name"],
                    model: conn.models.Plataforms
                }]
            })  
            var game = videogame.toJSON()
            videogame = {...game,genres: game.genres.map(e => e.name), plataforms: game.plataforms.map(e => e.name)}
        }else{
            var videogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            .then(res => res.data)
            .then(r => {return {
                id: r.id,
                name: r.name,
                description: r.description_raw,
                background_image: r.background_image,
                released: r.platforms[0].released_at,
                rating: r.rating,
                plataforms: r.platforms.map(e => e.platform.name),
                genres: r.genres.map(e => e.name)
            }})
        }
        res.send(videogame)
    }catch(e){
        res.send("Cannot bring the game with that id")
    }
})

router.post("/",async(req,res) => {
    try {
       var {name,description,released,rating,plataforms,genres,image} = req.body
       var existe = await Videogame.findAll({
            where: {
                [Op.or]:[{name:name},{background_image:image}]
            }
       })
       
       if(existe.length){
        throw new Error("Ya existe ese videojuego")
       }
       var newGame = await Videogame.create({
            name,description,released,rating,background_image: image
        })
         await newGame.addGenres(genres)
         await newGame.addPlataforms(plataforms)
        res.send({id: newGame.id,name: newGame.name,background_image:newGame.background_image,genres})
    } catch (error) {
        res.status(404).send(error.message)
    }
})


module.exports = router