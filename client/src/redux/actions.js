import axios from "axios"

var back= axios.create({baseURL:"http://localhost:3001"})

export function Page(nro){
    return ({
        type: "PAGE",
        payload: nro
    })
}


export function Games(){
    return function(dispatch){
        back.get("/videogames")
        .then(res => dispatch({type: "GAMES", payload: res.data}))
        .catch(err => console.error(err))
    }
}

export function Search(game){
    return function(dispatch){
        back.get(`/videogames?name=${game}`)
        .then(res => dispatch({type: "SEARCH", payload: res.data}))
        .then(() => dispatch({type: "SEARCH_VALUE", payload: game}))
        .catch(err => console.error(err))
    }
}

export function GameDetail(id){
    return function(dispatch){
        back.get(`/videogames/${id}`)
        .then(res => dispatch({type: "DETAILS",payload: res.data}))
        .catch(err => console.error(err))
    }
}

export function Genres(){
    return function(dispatch){
        back.get(`/genres`)
        .then(res => dispatch({type: "GENRES",payload: res.data}))
        .catch(err => console.error(err))
    }
}

export function Platforms(){
    return function(dispatch){
        back.get("/plataforms")
        .then(res => dispatch({type:"PLATFORMS",payload:res.data}))
        .catch(err => console.error(err))
    }
}

export function Create(obj){
    return function(dispatch){
        back.post("/videogames",obj)
        .then(() => alert(`SE CREO ${obj.name}`))
        .catch(err => console.error(err))
    }
}

export function Filtros(obj){
    return ({
        type: "FILTROS",
        payload: obj
    })
}

export function Orden(orden){
    return ({
        type: "ORDER",
        payload: orden
    })
}

export function LimpiarUnique(){
    return ({
        type: "LIMPIAR_UNIQUE"
    })
}

export function LimpiarGames(){
    return ({
        type: "LIMPIAR_GAMES"
    })
}