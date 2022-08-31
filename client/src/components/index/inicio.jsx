import React, { useEffect, useState } from "react";
import s from "./inicio.module.css"
import Nav from "../nav/nav";
import {useDispatch, useSelector} from "react-redux"
import { Games, Genres, Page } from "../../redux/actions";
import Card from "./cards/card";
import Filter from "../filter";
import Orden from "../order";

export default function Inicio(){
    var globalState = useSelector(state => state)

    var dispatch = useDispatch()
    
    var nroDePaginas = Math.ceil(globalState.games.length / 15 )
    var arrDePaginacion = []


    while(arrDePaginacion.length < nroDePaginas){
        arrDePaginacion.push("")
    }


    useEffect(() => {
        if(!globalState.searchValue) dispatch(Games())
        dispatch(Genres())
    },[globalState.filtros,globalState.order,globalState.searchValue])

    return (
    <div>
            <Nav/>
        <div className={s.subNav}>
          <img src="https://th.bing.com/th/id/R.1a9603e086aa1c932401130e0695c313?rik=8xIE67R6MLVOVw&pid=ImgRaw&r=0" alt="not found" className={s.imagen}/>
            {globalState.searchValue? null : <Filter/>}
            <div className={s.paginado}>
                {
                    arrDePaginacion.map((e,i) => <button className={globalState.actualPage == i + 1? `${s.active} ${s.butPag}` : s.butPag} onClick={e => {dispatch(Page(e.target.value))}} value={i + 1} key={i}>{i + 1}</button>)
                }
            </div>
            {globalState.searchValue? null : <Orden/>}
        </div>
            <div className={s.cards}>
                {
                    !globalState.games.length? (globalState.searchValue || globalState.filtros.create || globalState.filtros.genre? <h1 className={s.err}>No se enontraron coincidencias</h1>:<h1 className={s.err}>Cargando...</h1>) :
                    globalState.games.map((e,i) => {
                        if(i >= globalState.actualPage * 15 - 15 && i < globalState.actualPage * 15){
                            return  (<Card name={e.name} id={e.id} image={e.background_image} genres={e.genres} key={e.id} nro={i + 1}/>)
                        }
                })
                }
            </div>
        
    </div>
    )
}