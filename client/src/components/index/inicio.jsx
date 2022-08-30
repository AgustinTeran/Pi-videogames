import React, { useEffect, useState } from "react";
import s from "./inicio.module.css"
import Nav from "../nav/nav";
import {useDispatch, useSelector} from "react-redux"
import { Games, Genres, Page } from "../../redux/actions";
import Card from "./cards/card";
import Filter from "../filter";
import Orden from "../order";

export default function Inicio(){
    var games = useSelector(state => state.games)
    var pagina = useSelector(state => state.actualPage)
    var filtros = useSelector(state => state.filtros)
    var orden = useSelector(state => state.order)
    var search = useSelector(state => state.searchValue)

    var dispatch = useDispatch()
    
    var nroDePaginas = Math.ceil(games.length / 15 )
    var arrDePaginacion = []


    while(arrDePaginacion.length < nroDePaginas){
        arrDePaginacion.push("")
    }


    useEffect(() => {
        if(!search) dispatch(Games())
        dispatch(Genres())
    },[filtros,orden,search])

    return (
    <div>
            <Nav/>
        <div className={s.subNav}>
            <Filter/>
            <div>
                {
                    arrDePaginacion.map((e,i) => <button onClick={e => {dispatch(Page(e.target.value))}} value={i + 1} key={i}>{i + 1}</button>)
                }
            </div>
            <Orden/>
        </div>
            <div className={s.cards}>
                {
                    !games.length? <h1>Cargando...</h1> :
                    games.map((e,i) => {
                        if(i >= pagina * 15 - 15 && i < pagina * 15){
                            return  (<Card name={e.name} id={e.id} image={e.background_image} genres={e.genres} key={e.id} nro={i + 1}/>)
                        }
                })
                }
            </div>
        
    </div>
    )
}