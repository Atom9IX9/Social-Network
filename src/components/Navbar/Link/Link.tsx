import * as React from 'react';
import { NavLink } from "react-router-dom";
import style from "./Link.module.css";

type TLinkProps = {
  path: string;
  linkName: string;
}

const Link: React.FC<TLinkProps> = ({ path, linkName }) => {
  return (
    <li className={style.item}>
      <NavLink
        to={path}
        // className={({ isActive }) => (isActive ? style.active : "")}
      >
        {linkName}
      </NavLink>
    </li>
  );
};

export default Link;
