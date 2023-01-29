export const updateArrayObj = (
  items,
  integerPropName,
  objPropName,
  newObjProps
) => {
  return items.map((i) => {
    if (i[objPropName] === integerPropName) {
      return { ...i, ...newObjProps };
    }
    return i;
  });
};
