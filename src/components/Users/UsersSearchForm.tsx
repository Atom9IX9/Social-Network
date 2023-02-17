import { Field, Formik } from "formik";
import style from "./Users.module.css";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendFilter, getStatePageSize, getTerm } from "../../redux/selectors";
import { actions, getUsers } from "../../redux/usersReducer";
const { setFilter } = actions;

const usersSearchFormValidator = (values: any) => {
  const errors = {};
  return errors;
};

export const UsersSearchForm: React.FC<UsersSearchFormProps> = () => {
  const initialTerm = useSelector(getTerm);
  const initialFriend = useSelector(getFriendFilter);
  const pageSize = useSelector(getStatePageSize)
  const dispatch = useDispatch<any>();

  const onSubmit = (
    values: UsersSearchFormValuesType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const friend =
      values.friend === "true"
        ? true
        : values.friend === "false"
        ? false
        : null;
    setTimeout(() => {
      dispatch(setFilter(values.term, friend));
      dispatch(getUsers(1, pageSize, values.term, friend))
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <Formik
        initialValues={{
          term: initialTerm,
          friend: (initialFriend !== null
            ? `${initialFriend}`
            : null) as FriendValue,
        }}
        validate={usersSearchFormValidator}
        onSubmit={onSubmit}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              placeholder="...search"
              type="text"
              name="term"
              value={values.term}
            />
            <Field as="select" name="friend" className={style.friendFilterSelect}>
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className={style.searchBtn}
            >
              search
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UsersSearchForm;

type UsersSearchFormValuesType = {
  term: string;
  friend: FriendValue;
};
type FriendValue = "true" | "false" | null;
type UsersSearchFormProps = {
  getUsers: (
    currentPage: number,
    pageSize: number,
    term: string,
    friend: boolean | null
  ) => void;
};
