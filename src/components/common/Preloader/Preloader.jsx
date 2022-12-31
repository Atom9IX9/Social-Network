import preloader from "../../../assets/img/preloader.gif"
import React from "react"
import style from "./Preloader.module.css"

let Preloader = (props) => {
  return (
    <div className={style.preloader}>
      <img src={preloader} alt="preloader" />
    </div>
  )
}

export default Preloader;