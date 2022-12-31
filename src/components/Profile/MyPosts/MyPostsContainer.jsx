import MyPosts from "./MyPosts";
import { addPostFromForm } from "../../../redux/profileReducer";
import { connect } from "react-redux";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

export default compose(
  connect(mapStateToProps, { addPostFromForm })
)(MyPosts);
