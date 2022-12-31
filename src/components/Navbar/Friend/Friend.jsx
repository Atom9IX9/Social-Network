import s from "./Friend.module.css";

const Friend = (props) => {
  let friendName = props.name;

  return (
    <div className={s.friend}>
      <img
        src="https://i.pinimg.com/736x/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg"
        alt="avatar"
      />
      <div className={s.name}>{friendName}</div>
    </div>
  );
};

export default Friend;
