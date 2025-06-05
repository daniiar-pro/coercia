/**
 * Accepts a single boolean argument and returns its inverted value.
 *
 * @param {boolean} bool - The boolean value to invert.
 * @returns {boolean} - Inverted boolean value.
 * @throws {TypeError} - If the argument is not a boolean
 */
export function invertBoolean(bool) {
  if (typeof bool !== "boolean") {
    throw new TypeError("invertBoolean expects a boolean value.");
  }
  return !bool;
}

// console.log(invertBoolean(true));   // false
// console.log(invertBoolean(false));   // true

// Invalid combinations
// console.log(invertBoolean(1));   // Error
// console.log(invertBoolean("hi"));   // Error
