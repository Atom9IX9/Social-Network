export const required = (value) => {
  if (value) return undefined;
  return "Field is required!";
};

export const minLengthCreator = (min) => (value) => {
  if (value && value.length >= min) return undefined;
  return `Min length is ${min} symbols!`
}

export const maxLengthCreator = (max) => (value) => {
  if (value && value.length < max) return undefined;
  return `Max length is ${max} symbols!`
}
