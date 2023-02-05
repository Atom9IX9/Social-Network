import React from "react";
import style from "./ConnectionError.module.css";

const ConnectionError: React.FC = () => {
  return (
    <div className={style.error}>
      <span className={style.errorText}>ERROR</span>
      <div className={[style.round1, style.round].join(" ")}>Internet</div>
      <div className={[style.round2, style.round].join(" ")}>Connection :(</div>
      <div className={[style.round3, style.round].join(" ")}>No</div>
    </div>
  );
};

export default ConnectionError;
