import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { GameDetail } from "../../redux/actions";
import s from "./details.module.css"

export default function Details(){
    var history = useHistory()

    var {id} = useParams()
    var dispatch = useDispatch()
    var game = useSelector(state => state.game)

    useEffect(() => {
        dispatch(GameDetail(id))
    },[])
    return (
        <>
            {
                !(game.id == id)? <h1>Cargando...</h1>: 
                <>
                    <button onClick={() => history.goBack()} className={"volver"}>⇐</button>
                <div className={s.container}>
                    <h1 className={s.title}>{game.name}</h1>
                    <img src={game.background_image} alt={`${game.name} image`} className={s.image}/>
                    <h2>Rating:  ⭐{game.rating}</h2>
                    <div className={s.divMap}>
                        <h2 className={s.titleDivMap}>Plataformas</h2>
                        <div className={s.subDivMap}>
                            {
                                game.plataforms.map((e,i) => <h3 key={i} className={s.mapElement}>{e}</h3>)
                            }
                        </div>
                    </div>
                    <h4 style={{margin:"20px"}}>{game.name} fue realizado en la fecha {game.released}</h4>
                    <div className={s.divMap}>
                        <h2 className={s.titleDivMap}>Generos</h2>
                        <div className={s.subDivMap}>
                            {
                                game.genres.map((e,i) => <h3 className={s.mapElement} key={i}>{e}</h3>)
                            }
                        </div>
                    </div>
                    <p>{game.description}</p>
                </div> 
                </>
            }
        </>
    )
}