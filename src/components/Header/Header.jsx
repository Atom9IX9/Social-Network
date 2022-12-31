import s from "./Header.module.css";
import Logo from "../../assets/img/logo.jpg";
import { NavLink } from "react-router-dom";
import UserAvatar from "../../assets/img/2e2e2125ee53807c2d77b34773f84b5c.jpg";

const Header = (props) => {
  return (
    <header className={s.header}>
      <img src={Logo} alt="site logo" />
      {props.isAuth ? (
        <div className={s.authProfile}>
          <div>{!props.isAuth ? "" : <button onClick={props.logout}>Log out</button>}</div>
          <div className={s.login}>{props.login}</div>
          {props.profile ? (
            <img
              src={
                props.profile.photos.small
                  ? props.profile.photos.small
                  : UserAvatar
              }
              alt="user avatar"
            />
          ) : null}
        </div>
      ) : (
        <div className={s.loginBlock}>
          <NavLink to="/login">Log in</NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
