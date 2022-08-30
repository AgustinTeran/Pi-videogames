import React from "react";
import Existente from "./subfiltros/existente";
import Genres from "./subfiltros/genero";
import { useState } from "react"
import s from "./filter.module.css"


export default function Filter(){
    var [state,setState] = useState(false)

    return (
        <div className={s.container}>
            <h3 onClick={() => setState(state? false : true)} className={state? `${s.volver} ${s.h3}` :s.h3}>{state? "🡡" :"FILTRAR"}</h3>
            <div className={state? s.active : s.notActive}>
                <Existente/>
                <Genres/>
            </div> 
        </div>
    )
}