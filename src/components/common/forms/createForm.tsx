import React from "react";
import { Field } from "redux-form";
import { ValidatorType } from "../../../utils/validators";

export function createForm<FormKeysType extends string>(
  name: FormKeysType,
  component: any,
  placeholder: string | undefined,
  validators: Array<ValidatorType>,
  type?: string | undefined
) {
  return (
    <Field
      validate={validators}
      placeholder={placeholder}
      name={name}
      component={component}
      type={type}
    />
  );
}
