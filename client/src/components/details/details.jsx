import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { GameDetail } from "../../redux/actions";

export default function Details(){
    var history = useHistory()

    var {id} = useParams()
    var dispatch = useDispatch()
    var game = useSelector(state => state.game)

    useEffect(() => {
        dispatch(GameDetail(id))
    },[])
    return (
        <div>
            {
                !(game.id == id)? <h1>Cargando...</h1>:
                <div>
                    <button onClick={() => history.goBack()} className={"volver"}>⇐</button>
                    <h1>{game.name}</h1>
                    <img src={game.background_image} alt={`${game.name} image`} style={{height:"100%",width:"100%"}}/>
                    <h2>Rating: {game.rating}</h2>
                    {
                        game.plataforms.map((e,i) => <h3 key={i}>{e}</h3>)
                    }
                    <h4>{game.name} fue realizado en la fecha {game.released}</h4>
                    {
                    game.genres.map((e,i) => <h6 key={i}>{e}</h6>)
                    }
                    <p>{game.description}</p>
                </div> 
            }
        </div>
    )
}