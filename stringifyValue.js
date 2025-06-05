import { isPlainObject } from "./utilities.js";

/**
 * Converts any value to its string representation.
 * For plain objects and arrays, uses JSON.stringify().
 * @param {any} a - Any value to be converted to a string.
 * @returns - A string representation of the input.
 */
export function stringifyValue(a) {
  // If argument is an Object { key: value } pair or an Array, convert to JSON format
  if (isPlainObject(a) || Array.isArray(a)) {
    return JSON.stringify(a);
  }

  return String(a);
}

// console.log(stringifyValue({ name: "daniiar" }));
// console.log(stringifyValue([1, 2]));
// console.log(stringifyValue(1));
// console.log(stringifyValue(true));
// console.log(stringifyValue(false));
// console.log(stringifyValue(null));
// console.log(stringifyValue(undefined));
// console.log(stringifyValue(1000n));
// console.log(stringifyValue(Symbol("id")));
