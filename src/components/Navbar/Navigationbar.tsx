import * as React from "react";
import style from "./Nav.module.css";
import Friend from "./Friend/Friend";
import Link from "./Link/Link";
import { useSelector } from "react-redux";
import { rootStateType } from "../../redux/reduxStore";


const Navbar: React.FC<TNavbarProps> = () => {
  const friends = useSelector((state: rootStateType) => state.sidebar.friends)
  const links = useSelector((state: rootStateType) => state.sidebar.links)

  let friendsComponents = friends.map((f) => (
    <Friend name={f.name} key={friends.indexOf(f)} />
  ));

  let linksComponents = links.map((l) => (
    <Link path={l.path} linkName={l.linkName} key={l.linkId} />
  ));
  
  return (
    <nav className={style.nav}>
      <ul className={style.list}>{linksComponents}</ul>
      <div className={style.friends}>
        <h3>Friends</h3>
        <div className={style.friendsList}>{friendsComponents}</div>
      </div>
    </nav>
  );
};

export default Navbar;

type TNavbarProps = {};
