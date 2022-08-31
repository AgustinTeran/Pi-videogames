import React from "react";
import { Link } from "react-router-dom";
import s from "./card.module.css"


export default function Card({name,id,image,genres,nro}){
    return (
        <Link to={`/game/${id}`} className={s.link}>
        <div className={s.container}>
            <h1 className={s.text}>{name}</h1>
            <img src={image} alt={name} className={s.image}/>
            <div className={s.genres}>
                {
                    genres.map((e,i) => <p className={s.genre} key={i}>{e}</p>)
                }
            </div>
        </div>
        </Link>
    )
}