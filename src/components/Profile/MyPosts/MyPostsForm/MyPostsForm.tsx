import * as React from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { addPostFromFormFormDataType } from "../../../../redux/profileReducer";
import {
  maxLengthCreator,
  minLengthCreator,
} from "../../../../utils/validators";
import { FormInput } from "../../../common/forms/FormInput";

const minLength10 = minLengthCreator(10);
const maxLength300 = maxLengthCreator(300);

type TMyPostsFormProps = InjectedFormProps<addPostFromFormFormDataType>;

const MyPostsForm: React.FC<TMyPostsFormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={FormInput}
        name="newPostText"
        validate={[minLength10, maxLength300]}
      />
      <div>
        <button>Add Post</button>
      </div>
    </form>
  );
};

const myPostsReduxForm = reduxForm<addPostFromFormFormDataType>({
  form: "myPosts",
})(MyPostsForm);

export default myPostsReduxForm;
