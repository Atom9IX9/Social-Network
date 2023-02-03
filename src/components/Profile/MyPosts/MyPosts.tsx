import React from "react";
import { addPostFromFormFormDataType, PostType } from "../../../redux/profileReducer";
import style from "./MyPosts.module.css";
import MyPostsForm from "./MyPostsForm/MyPostsForm";
import Post from "./Post/Post";

type TMyPostsProps = {
  posts: Array<PostType>;
  addLike: (id: number, likes: number) => void;
  addPostFromForm: (formData: addPostFromFormFormDataType) => void;
}

const MyPosts: React.FC<TMyPostsProps> = ({ posts, addLike, addPostFromForm }) => {
  let postElements = posts.map((p) => (
    <Post
      text={p.text}
      likes={p.likes}
      liked={p.liked}
      key={p.postId}
      id={p.postId}
      addLike={addLike}
    />
  ));

  let onSubmit = (formData: addPostFromFormFormDataType) => addPostFromForm(formData);

  return (
    <div className={style.myPosts}>
      <h3>My Posts</h3>
      <MyPostsForm onSubmit={onSubmit} />
      <div className={style.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
