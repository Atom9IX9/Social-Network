import s from "./Nav.module.css";
import Friend from "./Friend/Friend";
import Link from "./Link/Link";

const Navbar = (props) => {
  let friends = props.friends.map((f) => (
    <Friend name={f.name} key={props.friends.indexOf(f)} />
  ));
  let links = props.links.map((l) => (
    <Link path={l.path} linkName={l.linkName} key={l.linkId} />
  ));
  return (
    <nav className={s.nav}>
      <ul className={s.list}>{links}</ul>
      <div className={s.friends}>
        <h3>Friends</h3>
        <div className={s.friendsList}>{friends}</div>
      </div>
    </nav>
  );
};

export default Navbar;
