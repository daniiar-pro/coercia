/**
 * Checks if the provided argument is valid integer
 * @param {any} value - The value that needs to be checked
 * @returns {boolean} - Returns true if value is a valid integer, otherwise false.
 */
export function isValidInteger(value) {
  return (
    typeof value === "bigint" ||
    (typeof value === "number" &&
      value <= Number.MAX_SAFE_INTEGER &&
      value >= Number.MIN_SAFE_INTEGER)
  );
}

/**
 * Checks if the date is valid date
 * @param {any} dateInput - The date that needs to be checked
 * @returns {boolean} - Returns true if the input is a valid date, otherwise false.
 */
export function isValidDate(dateInput) {
  return !isNaN(new Date(dateInput).getTime());
}

/**
 * Converts any supported input to a number.
 *
 * @param {any} a - The input to convert.
 * @returns {number} - The converted number.
 * @throws {Error} - If conversion is not possible.
 */
export function convertToNumber(a) {
  // Handle empty string
  if (a === "") {
    return 0;
  }

  if (typeof a === "boolean") {
    return a ? 1 : 0;
  }

  if (typeof a === "string") {
    const floatValue = parseFloat(a);
    if (!Number.isNaN(floatValue)) return floatValue;
    throw new Error("Invalid number string.");
  }

  if (typeof a === "bigint" && isValidInteger(a)) {
    return Number(a);
  }

  if (a === null) {
    return 0;
  }

  if (Array.isArray(a)) {
    if (a.length !== 1) {
      throw new Error("Array must contain exactly one element.");
    }

    const value = a[0];
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "bigint"
    ) {
      const parsed = Number(value);
      if (!Number.isNaN(parsed) && isValidInteger(parsed)) {
        return parsed;
      }
    }

    throw new Error("Array element is not a valid number.");
  }

  if (isValidDate(a)) {
    return Number(new Date(a));
  }

  throw new Error("Value cannot be converted to a number.");
}

//  Valid conversions
// console.log(convertToNumber("10")); // → 10
// console.log(convertToNumber("3.14")); // → 3.14
// console.log(convertToNumber(true)); // → 1
// console.log(convertToNumber(false)); // → 0
// console.log(convertToNumber(1000n)); // → 1000
// console.log(convertToNumber(null)); // → 0
// console.log(convertToNumber(["42"])); // → 42
// console.log(convertToNumber(new Date())); // → 1717029184972 (timestamp)
// console.log(convertToNumber(""));

// Invalid conversions
// convertToNumber(["42", "43"]);  // Error
// convertToNumber(undefined);     // Error
// convertToNumber(() => {});      // Error
// convertToNumber(Symbol("x"));   // Error
// convertToNumber("abc");         // Error
