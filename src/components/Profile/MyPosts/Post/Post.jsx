import s from "./Post.module.css";
import userPhoto from "../../../../assets/img/defaultUserAv.jpg";


const Post = (props) => {
  return (
    <div className={s.item}>
      <img
        src={userPhoto}
        alt="start user avatar"
      />
      <div className={s.text}> {props.text} </div>
      <div>
        <span className={s.likeBlock}>
          like(btn*)
          <br />({props.likes} peoples like this! )
        </span>
      </div>
      <hr />
    </div>
  );
};

export default Post;
