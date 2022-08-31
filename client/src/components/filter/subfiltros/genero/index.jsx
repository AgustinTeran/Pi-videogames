import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filtros } from "../../../../redux/actions";
import s from "./genero.module.css"



export default function Genres(){
    var genres = useSelector(state => state.genres)
    var filtros = useSelector(state => state.filtros)
    var dispatch = useDispatch()

    return (
        <div>
            <select className={s.select} value={filtros.genre} onChange={e => dispatch(Filtros({...filtros, genre: e.target.value}))}>
                 <option hidden>Por Genero</option>
                 {!filtros.genre? null :<option value="">Todos</option>}
                {
                    genres.map(e => <option value={e.name} key={e.id}>{e.name}</option>)
                }
            </select>
        </div>
    )
}