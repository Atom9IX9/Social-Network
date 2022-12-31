import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img
        src="https://i.pinimg.com/736x/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg"
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
