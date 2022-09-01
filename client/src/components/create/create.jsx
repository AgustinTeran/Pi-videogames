import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import s from "./create.module.css"
import {useDispatch, useSelector} from "react-redux"
import { Games, Genres, LimpiarGames, Platforms } from "../../redux/actions";
import { change,sub } from "./functions";


export default function Crear(){
    // name,description,released,rating,plataforms,genres,image
    var dispatch = useDispatch()
    var genres = useSelector(state => state.genres)
    var platforms = useSelector(state => state.platforms)
    var unique = useSelector(state => state.uniqueData)

    useEffect(() => {
        if(!platforms.length) dispatch(Platforms())
        if(!genres.length) dispatch(Genres())
        if(!unique.length) dispatch(Games())
    },[unique])

    var history = useHistory()
    var [state,setState] = useState({
        name:"",
        description:"",
        released:"",
        rating:"",
        plataforms:[],
        genres:[],
        image:""
    })

    var [errores,setError] = useState({
        name:"Se require nombre",
        description:"Se require descripción",
        released:"Se require fecha en la que se realizo",
        rating:"Se require rating/puntaje",
        plataforms:"",
        genres:"",
        image:"Se require imagen"
    })


    useEffect(() => {
        if(!(state.genres.length)) {
            setError((prev) => {return {...prev,genres: "Se requiere al menos un genero"}})
        } else {
            setError(prev => {return {...prev,genres:""}})
        }
        if(!(state.plataforms.length)) {
            setError((prev) => {return {...prev,plataforms: "Se requiere al menos una plataforma"}})
        } else {
            setError(prev => {return {...prev,plataforms:""}})
        }
    },[state])

    return (
        <div>
            <button onClick={() => {history.goBack()}} className={"volver"}>⇐</button>
            <form onSubmit={e => sub(e,state,errores,setState,setError,dispatch)} className={s.container}>
                <h1>Crea un Juego</h1>
                <div className={s.form} >
                    <div className={errores.name? `${s.err} ${s.divs}` : s.divs}>
                        <label>Nombre Del Videojuego</label>
                        <input type="text" id="nombre" onChange={e => change(e,setState,setError,unique)} placeholder="Nombre" name="name" value={state.name}/>
                        <span className={s.span}>{errores.name}</span>
                    </div>
                    <div className={errores.released? `${s.err} ${s.divs}` : s.divs}>
                        <label>Fecha De Lanzamiento</label>
                        <input type="date" id="fecha en la que se realizo" onChange={e => change(e,setState,setError)} name="released" value={state.released}/>
                        <span className={s.span}>{errores.released}</span>
                    </div>
                    <div className={errores.rating? `${s.err} ${s.divs}` : s.divs}>
                        <label>Rating</label>
                        <input type="number" id="rating/puntaje" onChange={e => change(e,setState,setError)} placeholder="Rating" name="rating" value={state.rating}/>
                        <span className={s.span}>{errores.rating}</span>
                    </div>
                    <div className={errores.genres? `${s.err} ${s.divs}` : s.divs}>
                        <label>Generos</label>
                        <select name="genres" onChange={e => change(e,setState,setError)}>
                            <option hidden>Seleccionar Generos</option>
                            {
                                genres.map(e => {
                                    if(!(state.genres.find(genero => genero == e.id))){
                                        return (
                                            <option value={e.id} key={e.id}>
                                                {
                                                  e.name
                                                }
                                         </option>
                                        )
                                    }
                                })
                            }
                        </select>
                        <div className={s.lista}>
                            {
                                state.genres.map((e,i) => {
                                    return <button className={s.but} key={i} value={e} onClick={event => {event.preventDefault();setState({...state, genres: state.genres.filter(id => id !== event.target.value)})}}>{genres.find(genero => genero.id == e).name}</button>
                                })
                            }
                        </div> 
                        <span className={s.span}>{errores.genres}</span>   
                    </div>
                    <div className={errores.plataforms? `${s.err} ${s.divs}` : s.divs}>
                        <label>Plataforms</label>
                        <select name="plataforms" onChange={e => change(e,setState,setError)}>
                            <option hidden>Seleccionar Plataformas</option>
                            {
                                platforms.map(e => {
                                    if(!(state.plataforms.find(plataforma => plataforma == e.id))){
                                        return (
                                            <option value={e.id} key={e.id}>
                                                {
                                                  e.name
                                                }
                                         </option>
                                        )
                                    }
                                })
                            }
                        </select>
                        <div className={s.lista}>
                            {
                                state.plataforms.map((e,i) => {
                                    return <button className={s.but} key={i} value={e} onClick={event => {event.preventDefault();setState({...state,plataforms: state.plataforms.filter(id => id !== event.target.value)})}}>{platforms.find(p => p.id == e).name}</button>
                                })
                            }
                        
                        </div>
                        <span className={s.span}>{errores.plataforms}</span> 
                    </div>
                    <div className={errores.image? `${s.err} ${s.divs}` : s.divs}>
                        <label>Imagen</label>
                        <input type="text" id="imagen" onChange={e => change(e,setState,setError,unique)} placeholder="Link de Imagen" name="image" value={state.image}/>
                        <span className={s.span}>{errores.image}</span>
                    </div>
                    <div className={errores.description? `${s.err} ${s.divs}` : s.divs}>
                        <label>Descripción</label>
                        <textarea type="text" id="descripción" onChange={e => change(e,setState,setError)} placeholder="Descripción" name="description" value={state.description}/>
                        <span className={s.span}>{errores.description}</span>
                    </div>
                </div>
                
                <div className={s.Send}>
                    <input type="submit" className={s.submit} value="Submit"/>
                </div>
            </form>
        </div>
    )
}