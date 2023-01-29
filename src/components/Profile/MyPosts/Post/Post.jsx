import s from "./Post.module.css";
import userPhoto from "../../../../assets/img/defaultUserAv.jpg";

const Post = (props) => {
  const addLike = () => {
    props.addLike(props.id, props.likes + 1);
  };

  return (
    <div className={s.item}>
      <img src={userPhoto} alt="start user avatar" />
      <div className={s.text}> {props.text} </div>
      <div>
        <span className={s.likeBlock}>
          <button disabled={props.liked} onClick={addLike}>
            like
          </button>
          <br />({props.likes} peoples like this! )
        </span>
      </div>
      <hr />
    </div>
  );
};

export default Post;
