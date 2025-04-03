var express = require("express")
var router = express.Router()
var sequelize = require("../db")

var Plataforms = sequelize.models.plataforms

router.get("/",async(req,res) => {
    try{
        res.send(await Plataforms.findAll())
    }catch(e){
        res.send("Cannot bring the plataforms")
    }   
})

module.exports = router