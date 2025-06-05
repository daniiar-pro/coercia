
# Coercia

A JavaScript utility library for safe and explicit type transformations.

## Features

- [addValues](#addvalues)
- [stringifyValue](#stringifyvalue)
- [invertBoolean](#invertboolean)
- [convertToNumber](#converttonumber)
- [coerceToType](#coercetotype)



## Installation & Usage

📦 Option 1: Install via npm

If you’re using Node.js or any modern bundler (like Vite, Webpack, Rollup):

```
npm install coercia
```

Then import and use any function:
```
import { addValues, convertToNumber } from "coercia";

console.log(addValues(10, 20));         // → 30
console.log(convertToNumber("3.14"));   // → 3.14
```

📦 npm page: https://www.npmjs.com/package/coercia



💻 Option 2: Clone the Repository

If you prefer to explore or modify the source code directly:

```
git clone https://github.com/daniiar-pro/coercia.git
```
```
cd coercia
npm install
```

You can now explore all modules in the / directory or import functions in a local project using relative paths.



🧪 Usage Examples
```
import { invertBoolean, stringifyValue } from "coercia";

console.log(invertBoolean(true));           // → false
console.log(stringifyValue({ key: "val" })); // → '{"key":"val"}'
```




## addValues 

The addValues() function smartly handles different types and returns the appropriate result based on logical, real-world expectations.

✅ Supported Type Combinations

```
| Type A  | Type B  | Result Type | Behavior         | Example                                      |
|---------|---------|-------------|------------------|----------------------------------------------|
| number  | number  | number      | Arithmetic sum   | `addValues(2, 3)` → `5`                      |
| string  | string  | string      | Concatenation    | `addValues("Hi", " there")` → `"Hi there"`   |
| number  | string  | string      | Concatenation    | `addValues(10, "px")` → `"10px"`             |
| string  | number  | string      | Concatenation    | `addValues("px", 10)` → `"px10"`             |
| boolean | boolean | number      | Bool to number   | `addValues(true, false)` → `1`               |
| bigint  | bigint  | bigint      | Arithmetic sum   | `addValues(1000n, 2000n)` → `3000n`          |
| array   | array   | array       | Merge arrays     | `addValues([1], [2])` → `[1, 2]`             |
| object  | object  | object      | Shallow merge    | `addValues({a: 1}, {b: 2})` → `{a: 1, b: 2}` |
```




🚫 Disallowed Type Combinations

The following combinations are explicitly rejected to avoid ambiguity, unexpected results, or unsafe behavior.

❌ Invalid Combinations

```
| Type A     | Type B     | Reason                                                       |
|------------|------------|--------------------------------------------------------------|
| null       | any        | Null values are not allowed                                  |
| undefined  | any        | Undefined values are not allowed                             |
| symbol     | any        | Cannot perform operations with Symbol                        |
| function   | any        | Cannot add function values                                   |
| bigint     | non-bigint | JS does not allow mixing BigInt with other types             |
| boolean    | string     | Prevents accidental coercion (e.g., `"trueabc"`)             |
| array      | non-array  | Prevents invalid array-object merging                        |
| object     | non-object | Only plain object + plain object is allowed                  |
```
All invalid combinations will result in a clear error being thrown, helping developers avoid bugs and misuse.



🔐 Error Examples

```
| Expression                         | Error Message                                                 |
|------------------------------------|---------------------------------------------------------------|
| addValues(null, 10)                | ❌ Error: Arguments cannot be null or undefined               |
| addValues(Symbol("x"), 5)          | ❌ Error: Addition with Symbol type is not supported          |
| addValues(() => 1, 2)              | ❌ Error: Addition with functions is not supported            |
| addValues(1000n, 5)                | ❌ Error: Cannot mix BigInt with other types                  |
| addValues(true, "abc")             | ❌ Error: Addition of Boolean and String is not allowed       |
| addValues([1], { x: 2 })           | ❌ Error: If one argument is an array, the other must be too  |
| addValues({ x: 1 }, [2])           | ❌ Error: If one argument is an object, the other must be too |
```



🧠 Design Philosophy

This library prioritizes logical safety and clarity over permissive coercion. It aligns with modern best practices for building safe, predictable utility functions in JavaScript.



## stringifyValue

The stringifyValue() function accepts a single argument of any type and returns a string representation of that value. It uses JSON.stringify() for objects and arrays, and String() for all other types.


✅ Supported Input Types
```
| Type     | Input                 | Output              | Description                         |
|----------|------------------------|---------------------|------------------------------------|
| object   | { name: "Daniiar" }    | '{"name":"Daniiar"}'| Serialized with JSON.stringify()   |
| array    | [1, 2, 3]              | '[1,2,3]'           | Serialized with JSON.stringify()   |
| number   | 1                      | '1'                 | String conversion                  |
| boolean  | true                   | 'true'              | String conversion                  |
| null     | null                   | 'null'              | String conversion                  |
| undefined| undefined              | 'undefined'         | String conversion                  |
| bigint   | 1000n                  | '1000'              | String conversion via String()     |
| symbol   | Symbol("id")           | 'Symbol(id)'        |  String conversion                 |
| function | () => {}               | '() => {}'          |  String conversion                 |
```




🧪 Usage Examples
```
stringifyValue({ name: "Daniiar" });   // → '{"name":"Daniiar"}'
stringifyValue([1, 2, 3]);             // → '[1,2,3]'
stringifyValue(42);                    // → '42'
stringifyValue(true);                  // → 'true'
stringifyValue(null);                  // → 'null'
stringifyValue(undefined);             // → 'undefined'
stringifyValue(1000n);                 // → '1000'
stringifyValue(Symbol("id"));          // → 'Symbol(id)'
stringifyValue(() => {});              // → '() => {}'
```



🧠 Design Philosophy

This function is designed to provide a safe, consistent, and minimal-loss way to represent any value as a string. It avoids JS quirks like "object Object" and makes it useful for logging, diagnostics, or serialization layers.





## invertBoolean

The invertBoolean() function accepts a single boolean argument and returns its inverted value (true → false, false → true). If the input is not a boolean, it throws a clear and descriptive error.



✅ Supported Input

```
Input Type	Example	    Result	
boolean     true	    false	
boolean	    false	    true	
```



❌ Disallowed Input

The function strictly accepts only boolean values. It will throw an error for any other type.

```
| Input       | Type       | Behavior   | Error Message                                 |
|-------------|------------|------------|-----------------------------------------------|
| 1           | number     | ❌ Error   | invertBoolean expects a boolean value.        |
| "true"      | string     | ❌ Error   | invertBoolean expects a boolean value.        |
| null        | null       | ❌ Error   | invertBoolean expects a boolean value.        |
| undefined   | undefined  | ❌ Error   | invertBoolean expects a boolean value.        |
| () => true  | function   | ❌ Error   | invertBoolean expects a boolean value.        |
| {}          | object     | ❌ Error   | invertBoolean expects a boolean value.        |

```


🧪 Usage Examples

```
// Valid usage
invertBoolean(true);      // → false
invertBoolean(false);     // → true

// Invalid usage (throws)
invertBoolean(1);         // ❌ Error
invertBoolean("true");    // ❌ Error
invertBoolean(null);      // ❌ Error
```



🧠 Design Philosophy

This function promotes strict type safety and eliminates ambiguity around coercion (like !!value tricks), ensuring clean, intentional boolean operations.


## convertToNumber

The convertToNumber() function accepts a single argument of any type and attempts to convert it to a number using logical, safe rules. It throws an error for invalid or ambiguous input types.



✅ Supported Input Types
```
| Input     | Type        | Output     | Result                                      |
|-----------|-------------|------------|---------------------------------------------|
| "42"      | string      | 42         | Parsed using `parseFloat()`                 |
| "3.14"    | string      | 3.14       | Float strings are fully supported           |
| ""        | string      | 0          | Empty string becomes 0                      |
| true/false| boolean     | 1 / 0      | Commonly used for flags                     |
| 1000n     | bigint      | 1000       | Must be within `Number.MAX_SAFE_INTEGER`    |
| null      | null        | 0          | Treated as empty/default input              |
| new Date()| Date        | timestamp  | Converts to milliseconds since epoch        |
| ["42"]    | string[]    | 42         | Single-item array with numeric string       |

```


❌ Disallowed Input Types

These types will throw an error to ensure clarity and prevent unexpected coercion:
```
| Input     | Type        | Reason                                       |
|-----------|-------------|----------------------------------------------|
| undefined | undefined   | Converts to `NaN` — unclear semantics        |
| function  | function    | Cannot convert to number meaningfully        |
| symbol    | symbol      | Throws on coercion in JavaScript             |
| {}        | object      | Converts to `NaN`                            |
| [1, 2]    | array       | Only single-element arrays allowed           |
| "abc"     | string      | Non-numeric string → ❌ error                |
| ["abc"]   | string[]    | Not a valid number                           |

```


🧪 Usage Examples

```

// ✅ Valid conversions
convertToNumber("10");          // → 10
convertToNumber("3.14");        // → 3.14
convertToNumber("");            // → 0
convertToNumber(true);          // → 1
convertToNumber(false);         // → 0
convertToNumber(1000n);         // → 1000
convertToNumber(null);          // → 0
convertToNumber(["42"]);        // → 42
convertToNumber(new Date());    // → 1717029184972 (timestamp)

// ❌ Invalid conversions
convertToNumber(["42", "43"]);  // ❌ Error
convertToNumber(undefined);     // ❌ Error
convertToNumber(() => {});      // ❌ Error
convertToNumber(Symbol("x"));   // ❌ Error
convertToNumber("abc");         // ❌ Error
```


🧠 Design Philosophy

This function prioritizes logical conversion paths and safe boundaries. It avoids JavaScript’s permissive but error-prone coercion behavior, making your data transformations more reliable and easier to debug.





## coerceToType

The coerceToType() function attempts to convert any input value to a specified primitive type ("string", "number", "boolean", "bigint", or "symbol"). It provides explicit control over coercion while preventing unsafe or illogical conversions.


✅ Supported Target Types

```
| Type      | Allowed Inputs                         | Description                                 |
|-----------|----------------------------------------|---------------------------------------------|
| "string"  | Anything                               | Uses `stringifyValue()` or `String()`       |
| "number"  | string, boolean, bigint, null, date    | Uses `convertToNumber()`                    |
| "boolean" | Anything                               | Uses `Boolean(value)`                       |
| "bigint"  | Integer string, number, or bigint      | Uses `BigInt()` (strict rules)              |
| "symbol"  | string or number                       | Uses `Symbol()`                             |
```



❌ Disallowed Target Types

These complex types are not supported as coercion targets and will throw an error:
```
	•	"object"
	•	"array"
	•	"function"
	•	"null" or "undefined" (cannot coerce to them)
```



🧪 Usage Examples

✅ Valid Conversions

```
coerceToType(10, "string");             // → "10"
coerceToType("3.14", "number");         // → 3.14
coerceToType(true, "number");           // → 1
coerceToType(false, "string");          // → "false"
coerceToType("42", "bigint");           // → 42n
coerceToType(0, "boolean");             // → false
coerceToType(123, "symbol");            // → Symbol(123)
```

❌ Invalid Conversions (Throw Errors)

```
coerceToType("hi", "array");            // ❌ Error: Cannot coerce to complex type "array"
coerceToType("notInt", "bigint");       // ❌ Error: Cannot convert value to BigInt.
coerceToType(null, "symbol");           // ❌ Error: Only string or number can be converted to Symbol.
coerceToType("42", "undefined");        // ❌ Error: Unsupported target type: "undefined"
coerceToType("{}", "object");           // ❌ Error: Cannot coerce to complex type "object"
```



🧠 Why This Function Exists

JavaScript’s implicit coercion can lead to surprising or unsafe results. This function provides:

- Clear, readable conversions
- Guardrails around unsupported types
- Meaningful errors when coercion isn’t possible

Perfect for use in:
- Form validation
- Dynamic type systems
- Parsing loose inputs safely


