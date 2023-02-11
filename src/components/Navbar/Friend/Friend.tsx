import style from "./Friend.module.css";
import userPhoto from "../../../assets/img/defaultUserAv.jpg";
import React from "react";

const Friend: React.FC<FriendProps> = ({name}) => {
  return (
    <div className={style.friend}>
      <img
        src={userPhoto}
        alt="avatar"
      />
      <div className={style.name}>{name}</div>
    </div>
  );
};

export default Friend;

type FriendProps = { name: string }
