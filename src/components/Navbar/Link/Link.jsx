import { NavLink } from "react-router-dom";
import s from "./Link.module.css";

const Link = (props) => {
  return (
    <li className={s.item}>
      <NavLink
        to={props.path}
        className={({ isActive }) => (isActive ? s.active : "")}
      >
        {props.linkName}
      </NavLink>
    </li>
  );
};

export default Link;
