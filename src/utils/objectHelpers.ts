export function updateArrayObj<TArrayItem, TComparisonValue>(
  items: Array<TArrayItem>,
  objPropName: Extract<keyof TArrayItem, string>,
  integerPropName: TComparisonValue,
  newObjProps: {
    [Property in keyof TArrayItem]?: TArrayItem[Property];
  }
) {
  return items.map((i) => {
    if (i[objPropName] === integerPropName) {
      return { ...i, ...newObjProps };
    }
    return i;
  });
}