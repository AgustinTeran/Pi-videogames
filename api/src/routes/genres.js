require('dotenv').config();
const {
    API_KEY
  } = process.env;

var axios = require("axios")
var express = require("express")
var router = express.Router()
var {Genres} = require("../db")

router.get("/",async(req,res) => {
    try{
        var arrGenres = await Genres.findAll()

        if(!arrGenres.length){
            var genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then(res => res.data.results)
            .then(response => response.map(e => e.name))
            .catch(() => "")
            for (let i = 0; i < genres.length; i++) {
                await Genres.create({name: genres[i]})              
            }

            res.send(await Genres.findAll())
        }else{
            res.send(arrGenres)
        }        
    }catch(e){

        res.send({message:"Cannot bring the genres",error: e}) 
    }
})

module.exports = router