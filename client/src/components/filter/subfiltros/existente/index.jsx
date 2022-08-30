import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filtros } from "../../../../redux/actions";

export default function Existente(){
    var filtros = useSelector(state => state.filtros)
    var dispatch = useDispatch()
    return (
        <div>
            <select value={filtros.create} onChange={e => dispatch(Filtros({...filtros,create: e.target.value}))}>
                <option hidden>Por Creados/Existentes</option>
                {!filtros.create? null :<option value="">Todos</option>}
                <option value={1}>Existentes</option> {/* El valor es un nro para que el typeof sea nro */}
                <option value="string">Creados</option> {/* El valor es un string para que el typeof sea string */}
            </select>
        </div>
    )
}