import { NavLink } from "react-router-dom";
import style from "./Contact.module.css";
import userPhoto from "../../../assets/img/defaultUserAv.jpg";
import React from "react";

const Contact: React.FC<TContactProps> = ({contactId, contactName}) => {
  const path = `${contactId}`;

  return (
    <div className={style.contact}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? style.active : "")}
      >
        <div className={style.avatarWrapper}>
          <img src={userPhoto} alt="user avatar" />
        </div>
        <div className={style.name}>{contactName}</div>
      </NavLink>
    </div>
  );
};

export default Contact;

type TContactProps = {contactId: number; contactName: string}
