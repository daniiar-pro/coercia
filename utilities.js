/**
 * Determines if the provided value is a plain object (i.e., a direct `{ key: value}` structure).
 * @param {any} value - The value to test.
 * @returns {boolean} - True if the value is  a plain object, otherwise false.
 */
export function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.prototype.toString.call(value) === "[object Object]" &&
    !Array.isArray(value)
  );
}
