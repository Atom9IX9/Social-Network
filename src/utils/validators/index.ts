export type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = (value) => {
  if (value) return undefined;
  return "Field is required!";
};

export const minLengthCreator = (min: number): ValidatorType => (value) => {
  if (value && value.length >= min) return undefined;
  return `Min length is ${min} symbols!`
} 

export const maxLengthCreator = (max: number): ValidatorType => (value) => {
  if (value && value.length < max) return undefined;
  return `Max length is ${max} symbols!`
}
