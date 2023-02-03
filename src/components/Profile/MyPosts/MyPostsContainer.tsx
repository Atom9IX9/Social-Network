import MyPosts from "./MyPosts";
import {
  addPostFromForm,
  actions,
  PostType,
  addPostFromFormFormDataType,
} from "../../../redux/profileReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { rootStateType } from "../../../redux/reduxStore";
const { addLike } = actions;

type TMapStateToProps = {
  posts: Array<PostType>;
};
type TMapDispatchToProps = {
  addLike: (id: number, likes: number) => void;
  addPostFromForm: (formData: addPostFromFormFormDataType) => void;
};

let mapStateToProps = (state: rootStateType): TMapStateToProps => {
  return {
    posts: state.profilePage.posts,
  };
};

export default compose(
  connect<TMapStateToProps, TMapDispatchToProps, {}, rootStateType>(
    mapStateToProps,
    { addPostFromForm, addLike }
  )
)(MyPosts);
