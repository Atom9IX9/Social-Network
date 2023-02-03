import * as React from "react";
import style from "./Nav.module.css";
import Friend from "./Friend/Friend";
import Link from "./Link/Link";
import { SidebarFriendType, SidebarLinkType } from "../../redux/sidebarReducer";

type TNavbarProps = {
  friends: Array<SidebarFriendType>;
  links: Array<SidebarLinkType>;
};

const Navbar: React.FC<TNavbarProps> = ({ friends, links }) => {
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
