import { reduxForm, Field } from "redux-form";
import {
  maxLengthCreator,
  minLengthCreator,
} from "../../../../utils/validators";
import FormInput from "../../../common/forms/FormInput";

const minLength10 = minLengthCreator(10);
const maxLength300 = maxLengthCreator(300);

const MyPostsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
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

const myPostsReduxForm = reduxForm({
  form: "myPosts",
})(MyPostsForm);

export default myPostsReduxForm;
