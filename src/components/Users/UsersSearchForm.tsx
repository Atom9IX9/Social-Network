import { Field, Formik } from "formik";
import style from "./Users.module.css";
import * as React from "react";

const usersSearchFormValidator = (values: any) => {
  const errors = {};
  return errors;
};

export const UsersSearchForm: React.FC<UsersSearchFormProps> = ({
  setFilter,
}) => {
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
      setFilter(values.term, friend);
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <Formik
        initialValues={{ term: "", friend: null }}
        validate={usersSearchFormValidator}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              placeholder="...search"
              type="text"
              name="term"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.term}
            />
            <Field as="select" name="friend">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            {errors.term || errors.friend}
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
  friend: "true" | "false" | null;
};
type UsersSearchFormProps = {
  setFilter: (term: string, friend: boolean | null) => void;
  getUsers: (
    currentPage: number,
    pageSize: number,
    term: string,
    friend: boolean | null
  ) => void;
};
