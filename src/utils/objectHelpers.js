export const updateArrayObj = (items, elId, objPropName, newObjProps) => {
  return items.map((u) => {
    if (u[objPropName] === elId) {
      return { ...u, ...newObjProps };
    }
    return u;
  })
}