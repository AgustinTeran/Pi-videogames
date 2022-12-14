import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Games, Page, Search } from "../../redux/actions";
import s from "./nav.module.css"



export default function Nav(){
    var pagina = useSelector(state => state.actualPage)
    var [pagCache,setPag] = useState(pagina)
    var search = useSelector(state => state.searchValue)

    var [state,setState] = useState("")

    var dispatch = useDispatch()

    useEffect(() => {
        if(!search.length) {setPag(pagina)}
        else {dispatch(Page(1))}
    },[search,pagina])

    useEffect(() => {
        if(!search.length) dispatch(Page(pagCache))
    },[search])

    
    return (
        <nav className={s.nav}>
                <NavLink to={"/create"} className={s.link}><h4 className={s.create}>CREAR JUEGO</h4></NavLink>
                <div className={s.buscador}>
                     <input className={s.inp} type="text" placeholder="Buscar juego..." value={!state && search.length > 1? search : state} onChange={e => {setState(e.target.value);dispatch(Search(e.target.value))}}/>
                </div>
        </nav>
    )
}