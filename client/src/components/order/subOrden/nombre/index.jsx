import React from "react";
import s from "./nombre.module.css"
import {useDispatch, useSelector} from "react-redux"
import { Orden } from "../../../../redux/actions";

export default function Nombre(){
    var dispatch = useDispatch()
    var orden = useSelector(state => state.order)
    return (
        <>
            <select className={s.select} value={orden == "az" || orden == "za"? orden : "Por Nombre"} onChange={e => dispatch(Orden(e.target.value))}>
                <option hidden>Por Nombre</option>
                <option value={"az"}>A-Z</option>
                <option value={"za"}>Z-A</option>
            </select>
        </>
    )
}