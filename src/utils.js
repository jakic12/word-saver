export const deepEquals = (object1, object2) => {
  if (!object1 || !object2) {
    return false;
  }
  if (
    typeof object1 === "object" &&
    object1 !== null &&
    object1 !== undefined
  ) {
    if (Object.keys(object1).length !== Object.keys(object2).length)
      return false;

    let out = true;

    Object.keys(object1).forEach(key => {
      if (out && !deepEquals(object1[key], object2[key])) out = false;
    });
    return out;
  } else {
    if (
      typeof object2 === "object" &&
      object2 !== null &&
      object2 !== undefined
    ) {
      // if object1 is object and object2 isn't
      return false;
    }
    return object1 === object2;
  }
};
