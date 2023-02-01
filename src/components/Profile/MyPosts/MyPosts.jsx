import React from "react";
import s from "./MyPosts.module.css";
import MyPostsForm from "./MyPostsForm/MyPostsForm";
import Post from "./Post/Post";

const MyPosts = ({posts, addLike, addPostFromForm}) => {
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

  let onSubmit = (formData) => addPostFromForm(formData);

  return (
    <div className={s.myPosts}>
      <h3>My Posts</h3>
      <MyPostsForm onSubmit={onSubmit} />
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
