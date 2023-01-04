import s from "./Friend.module.css";
import userPhoto from "../../../assets/img/defaultUserAv.jpg";

const Friend = (props) => {
  let friendName = props.name;

  return (
    <div className={s.friend}>
      <img
        src={userPhoto}
        alt="avatar"
      />
      <div className={s.name}>{friendName}</div>
    </div>
  );
};

export default Friend;
