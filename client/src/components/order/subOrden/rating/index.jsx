import React from "react";
import {useDispatch,useSelector} from "react-redux"
import { Orden } from "../../../../redux/actions";
import s from "./rating.module.css"


export default function Rating(){
    var dispatch = useDispatch()
    var orden = useSelector(state => state.order)

    return (
        <>
            <select className={s.select} value={orden == "M-m" || orden == "m-M"? orden : "Por Rating"} onChange={e => dispatch(Orden(e.target.value))}>
                <option hidden>Por Rating</option>
                <option value="M-m">Mayor a menor</option>
                <option value="m-M">Menor a mayor</option>
            </select>
        </>
    )
}