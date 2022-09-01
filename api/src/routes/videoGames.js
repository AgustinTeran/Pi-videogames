require('dotenv').config();
const {
    API_KEY
  } = process.env;

var express = require("express")
var router = express.Router()
var {Videogame, conn} = require("../db")
var axios = require("axios")
var {buscadora} = require("../funciones")

var Cache = [] // Para no estar haciendo pedidos a la api todo el tiempo, lo hago 1 vez y listo
var cantidadGamesDb = "" 
var gamesAPI = []

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
               
               
               let i = 1
               if(!Cache.length){
                //console.log("Cargo los games de la api, osea que es el primer request si o si");
                while(i < 6){
                    await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
                     .then(async(res) => {
                        var results = res.data.results
                        for (let j = 0; j < results.length; j++) {

                            for (let k = 0; k < results[j].platforms.length; k++) {
                                await conn.models.Plataforms.findOrCreate({
                                   where:{name: results[j].platforms[k].platform.name}
                                })    
                            }

                         gamesAPI.push({id: results[j].id, name: results[j].name, rating:results[j].rating, background_image: results[j].background_image,genres: results[j].genres.map(e => e.name)}) 
                            
                        }
                      }
                     )
                     i++
                }
               }
            //    console.log("Me muestro solo si es el primer request o se agrego un juego");
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
       var newGame = await Videogame.create({
            name,description,released,rating,background_image: image
        })
         await newGame.addGenres(genres)
         await newGame.addPlataforms(plataforms)
        res.send({id: newGame.id,name: newGame.name,background_image:newGame.background_image,genres})
    } catch (error) {
        res.send("Cannot create the videogame")
    }
})


module.exports = router