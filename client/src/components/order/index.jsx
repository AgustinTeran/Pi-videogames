import React from "react";
import { useState } from "react";
import Nombre from "./subOrden/nombre";
import Rating from "./subOrden/rating";
import s from "./order.module.css"
import { useDispatch } from "react-redux";
import { Orden as ord } from "../../redux/actions";

export default function Orden(){
    var [state,setState] = useState(false)
    var dispatch = useDispatch()
    return (
        <div className={s.container}>
            <h3 onClick={() => setState(state? false : true)} className={state? `${s.volver} ${s.h3}` :s.h3}>{state? "🡡" :"ORDENAR"}</h3>
            <div className={state? s.active : s.notActive}>
                <Nombre/>
                <Rating/>
                <button onClick={() => dispatch(ord(""))}>Por defecto</button>
            </div> 
        </div>
    )
}