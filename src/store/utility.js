

export const updateObject = (oldObject, updaterObj) => {
  // copy oldObject, then replace values with those found in updaterObj
  return {
    ...oldObject,
    ...updaterObj
  }
};