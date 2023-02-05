import React from "react";
import { Field } from "redux-form";
import { ValidatorType } from "../../../utils/validators";
import { TFormProps } from "./FormControls";

export function createForm<FormKeysType extends string>(
  name: FormKeysType,
  component: React.FC<TFormProps>,
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
