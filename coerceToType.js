import { convertToNumber } from "./convertToNumber.js";
import { stringifyValue } from "./stringifyValue.js";

/**
 * Attempts to convert a value to a specific JavaScript type.
 *
 * @param {any} value - The input value to convert.
 * @param {string} type - The desired target type ("string", "number", "boolean", etc).
 * @returns {any} - The coerced value.
 * @throws {Error} - If conversion is not supported or fails.
 */
export function coerceToType(value, type) {
  const supportedTypes = new Set([
    "string",
    "number",
    "boolean",
    "bigint",
    "symbol",
    "object",
    "array",
    "function",
  ]);

  if (!supportedTypes.has(type)) {
    throw new Error(`Unsupported target type: "${type}"`);
  }

  if (type === "string") {
    return stringifyValue(value);
  }

  if (type === "number") {
    return convertToNumber(value);
  }

  if (type === "boolean") {
    return Boolean(value);
  }

  if (type === "bigint") {
    if (typeof value === "bigint") return value;
    if (typeof value === "number" && Number.isInteger(value))
      return BigInt(value);
    if (typeof value === "string" && /^-?\d+$/.test(value))
      return BigInt(value);
    throw new Error("Cannot convert value to BigInt.");
  }

  if (type === "symbol") {
    if (typeof value === "string" || typeof value === "number") {
      return Symbol(value);
    }
    throw new Error("Only string or number can be converted to Symbol.");
  }

  // Complex types (intentional restriction)
  throw new Error(`Cannot coerce value to complex type "${type}"`);
}

// Valid conversion
// console.log(coerceToType(10, "string")); // → "10"
// console.log(coerceToType("3.14", "number")); // → 3.14
// console.log(coerceToType(true, "number")); // → 1
// console.log(coerceToType(false, "string")); // → "false"
// console.log(coerceToType("42", "bigint")); // → 42n
// console.log(coerceToType(0, "boolean")); // → false
// console.log(coerceToType(123, "symbol")); // → Symbol(123)

// Invalid conversion
// console.log(coerceToType("hi", "array")); // Error: Cannot coerce to complex type "array"
// console.log(coerceToType("notInt", "bigint")); // Error: Cannot convert value to BigInt.
// console.log(coerceToType(null, "symbol")); // Error: Only string or number can be converted to Symbol.
// console.log(coerceToType("42", "undefined")); // Error: Unsupported target type: "undefined"
// console.log(coerceToType("{}", "object")); // Error: Cannot coerce to complex type "object"
