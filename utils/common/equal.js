
/**
 * Performs a shallow equality check of two values.
 */
export function shallowEqual(valueA, valueB) {
  // Returns true if values are the same
  if (Object.is(valueA, valueB)) {
    return true;
  }

  // Null is an object so return false in case one of values is null
  if (valueA === null || valueB === null) {
    return false;
  }

  const isArrayA = Array.isArray(valueA);
  const isArrayB = Array.isArray(valueB);

  if (isArrayA !== isArrayB) {
    return false;
  }

  if(isArrayA) {
    // Compare values of two arrays
    const len = valueA.length;
    if (!Array.isArray(valueB) || len !== valueB.length) {
      return false;
    }

    for (let i = 0; i < len; i++) {
      if (!Object.is(valueA[i], valueB[i])) {
        return false;
      }
    }
  } else if (typeof valueA === 'object' && typeof valueB === 'object') {
    // Compare properties of two objects
    const keysA = Object.keys(valueA);
    const keysB = Object.keys(valueB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let i = 0; i < keysA.length; i++) {
      if (!valueB.hasOwnProperty(keysA[i]) ||
          !Object.is(valueA[keysA[i]], valueB[keysA[i]])) {
        return false;
      }
    }
  } else {
    return false;
  }

  return true;
}
