import React from "react";
import s from "./landing.module.css"
import { useHistory } from "react-router-dom";


export default function Landing(){
    var history = useHistory()
  
    return (
        <div className={s.App}>
          <img src="https://th.bing.com/th/id/R.1a9603e086aa1c932401130e0695c313?rik=8xIE67R6MLVOVw&pid=ImgRaw&r=0" alt="not found" className={s.imagen}/>
          <button className={s.but} onClick={() => history.push("/inicio")}>INGRESAR</button>
        </div>
      );
}