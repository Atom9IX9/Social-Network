import { NavLink } from "react-router-dom";
import s from "./Contact.module.css";
import userPhoto from "../../../assets/img/2e2e2125ee53807c2d77b34773f84b5c.jpg";

const Contact = (props) => {
  const path = `${props.contactId}`;

  return (
    <div className={s.contact}>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? s.active : "")}
      >
        <div className={s.avatarWraper}>
          <img src={userPhoto} alt="user avatar" />
        </div>
        <div className={s.name}>{props.name}</div>
      </NavLink>
    </div>
  );
};

export default Contact;
