import s from "./Post.module.css";
import userPhoto from "../../../../assets/img/defaultUserAv.jpg";
import React from "react";

type PostPropsType = {
  id: number;
  likes: number;
  text: string;
  liked: boolean;

  addLike: (postId: number, likes: number) => void;
};

const Post: React.FC<PostPropsType> = ({ id, likes, liked, text, addLike }) => {
  const addLikeToPost = () => {
    addLike(id, likes);
  };

  return (
    <div className={s.item}>
      <img src={userPhoto} alt="start user avatar" />
      <div className={s.text}> {text} </div>
      <div>
        <span className={s.likeBlock}>
          <button disabled={liked} onClick={addLikeToPost}>
            like
          </button>
          <br />({likes} peoples like this! )
        </span>
      </div>
      <hr />
    </div>
  );
};

export default Post;
