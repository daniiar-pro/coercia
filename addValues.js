import { isPlainObject } from "./utilities.js";

/**
 * Combines two values using appropriate logic based on their types.
 *
 * @param {any} a - First operand
 * @param {any} b - Second operand
 * @returns {any} - The result of combining the inputs
 * @throws {Error} - For unsupported or unsafe type combinations
 */

export function addValues(a, b) {
  //  Null or undefined check
  if (a == null || b == null) {
    throw new Error("Arguments cannot be null or undefined.");
  }

  // Symbol check
  if (typeof a === "symbol" || typeof b === "symbol") {
    throw new Error("Addition with Symbol type is not supported");
  }

  // Function check
  if (typeof a === "function" || typeof b === "function") {
    throw new Error("Addition with functions is not supported.");
  }

  // Mixed BigInt and non-BigInt
  if (
    (typeof a === "bigint" && typeof b !== "bigint") ||
    (typeof a !== "bigint" && typeof b === "bigint")
  ) {
    throw new Error("Cannot mix BigInt with other types.");
  }

  // Boolean + Boolean ---> Number
  if (typeof a === "boolean" && typeof b === "boolean") {
    return Number(a) + Number(b);
  }

  // Disallow Boolean + String
  if (
    (typeof a === "boolean" && typeof b === "string") ||
    (typeof a === "string" && typeof b === "boolean")
  ) {
    throw new Error("Addition of Boolean and String is not allowed.");
  }

  //  Array + Non-array
  const isArrayA = Array.isArray(a);
  const isArrayB = Array.isArray(b);
  if ((isArrayA && !isArrayB) || (!isArrayA && isArrayB)) {
    throw new Error("If one argument is an array, the other must be too.");
  }

  // Array + Array --> Merge
  if (isArrayA && isArrayB) {
    return a.concat(b);
  }

  // Object + Non-object
  if (
    (!isPlainObject(a) && isPlainObject(b)) ||
    (isPlainObject(a) && !isPlainObject(b))
  ) {
    throw new Error(
      "If one argument is an object { key: value } pair, the other must be too."
    );
  }

  // Object {key: value} pair + Object {key: value} pair --> Shallow merge
  if (isPlainObject(a) && isPlainObject(b)) {
    return { ...a, ...b };
  }

  //   Fallback: valid primitive coercion (number + string, etc.)
  return a + b;
}

// console.log(addValues(10, 20));                 // 30
// console.log(addValues("Hello, ", "World"));     // "Hello, World"
// console.log(addValues(10, " dollars"));         // "10 dollars"
// console.log(addValues(true, false));            // 1
// console.log(addValues([1, 2], [3, 4]));          // [1, 2, 3, 4]
// console.log(addValues({ a: 1 }, { b: 2 }));      // { a: 1, b: 2 }
// console.log(addValues(1000n, 2000n));            // 3000n

// Invalid combinations
// console.log(addValues(true, "abc"));         // Error
// console.log(addValues(null, 1));             // Error
// console.log(addValues(() => {}, 1));         // Error
// console.log(addValues(Symbol("x"), 1));      // Error
// console.log(addValues(1000n, 1));            // Error
// console.log(addValues([1,2], {num: 3} ));    // Error
