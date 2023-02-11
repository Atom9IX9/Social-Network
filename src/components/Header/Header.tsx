import style from "./Header.module.css";
import Logo from "../../assets/img/logo.jpg";
import { NavLink } from "react-router-dom";
import UserAvatar from "../../assets/img/defaultUserAv.jpg";
import { ProfileType } from "../../types/types";

const Header: React.FC<HeaderProps> = ({ isAuth, logout, login, profile }) => {
  return (
    <header className={style.header}>
      <img src={Logo} alt="site logo" />
      {isAuth ? (
        <div className={style.authProfile}>
          <div><button onClick={logout}>Log out</button></div>
          <div className={style.login}>{login}</div>
          {profile && (
            <img
              src={profile.photos.small ? profile.photos.small : UserAvatar}
              alt="user avatar"
            />
          )}
        </div>
      ) : (
        <div className={style.loginBlock}>
          <NavLink to="/login">Log in</NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;

type HeaderProps = {
  isAuth: boolean;
  logout: () => void;
  login: string | null;
  profile: ProfileType | null;
};
