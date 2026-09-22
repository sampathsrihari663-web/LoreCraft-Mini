/**
 * File: js/service/lessons/javascriptLessons.js
 * Comprehensive teaching scrolls and targeted trial questions for World 6: JavaScript.
 */

export const JAVASCRIPT_LESSONS = {
  "js-1": {
    title: "Variables (var / let / const)",
    summary: [
      "JavaScript provides three keywords for declaring variables: var, let, and const.",
      "'let' allows you to reassign values later, whereas 'const' prevents reassignment after initialization. Both 'let' and 'const' are BLOCK-SCOPED (confined within curly braces { }).",
      "AVOID 'var': 'var' is an outdated legacy keyword that is function-scoped (or globally scoped) and gets hoisted with undefined. This causes scope leakage and hard-to-find bugs. Modern JavaScript standard practice is to default to 'const', and use 'let' only when you know a variable must be reassigned."
    ],
    keyPoints: [
      "const: Block-scoped, must be initialized immediately, cannot be reassigned (use by default).",
      "let: Block-scoped, can be reassigned over time (use for counters, toggles).",
      "Avoid var: Function-scoped, hoisted to undefined, prone to accidental overwriting.",
      "Mutating Objects: 'const' prevents reassigning the variable, but properties of const objects and arrays CAN still be mutated!"
    ],
    codeExample: `// 1. const cannot be reassigned
const maxHealth = 100;
// maxHealth = 120; // ERROR! TypeError: Assignment to constant variable.

// 2. let can be reassigned
let currentHealth = maxHealth;
currentHealth -= 25; // Allowed!

// 3. const objects can have properties mutated
const inventory = ["sword"];
inventory.push("shield"); // Allowed! Array contents can change.

// 4. Block scoping
if (true) {
  let secretSpell = "Invisibility";
}
// console.log(secretSpell); // ERROR! secretSpell only exists inside the if block.` ,
    questions: [
      "What is the difference between 'let' and 'const' in JavaScript, and why should you avoid using 'var'?",
      "Can you add new items to an array declared with 'const' in JavaScript?",
      "What is block scoping, and which variable keywords adhere to it?"
    ]
  },

  "js-2": {
    title: "Data Types & Operators",
    summary: [
      "JavaScript has eight core data types: seven primitives (Number, String, Boolean, Null, Undefined, BigInt, Symbol) and one composite type (Object, which includes Arrays and Functions).",
      "NULL VS UNDEFINED: 'undefined' means a variable has been declared but not yet assigned any value (or a function didn't return anything). 'null' is an intentional assignment indicating the deliberate absence of an object or value.",
      "JavaScript uses 'typeof' to inspect types (note the historical quirk: typeof null returns 'object')."
    ],
    keyPoints: [
      "Primitives: Passed by value (numbers, strings, booleans).",
      "Objects/Arrays: Passed by reference.",
      "null vs undefined: undefined = unassigned default; null = intentional empty placeholder.",
      "typeof operator: Inspects variable type (e.g. typeof 42 is 'number')."
    ],
    codeExample: `let playerQuest;               // undefined (declared, but unassigned)
console.log(playerQuest);      // Output: undefined

let targetEnemy = null;        // null (intentionally cleared / no target)
console.log(targetEnemy);      // Output: null

console.log(typeof 42);        // "number"
console.log(typeof "Arcane");  // "string"
console.log(typeof true);      // "boolean"`,
    questions: [
      "What is the difference between null and undefined in JavaScript?",
      "What does the typeof operator do, and what does typeof 'Hello' return?",
      "What are primitive data types in JavaScript, and how do they differ from objects?"
    ]
  },

  "js-3": {
    title: "Conditionals",
    summary: [
      "Conditionals control execution using if, else if, else, and ternary expressions.",
      "CRITICAL RULE (== VS ===): Loose equality (==) performs type coercion, meaning it converts types before comparing (e.g. '5' == 5 evaluates to true). Strict equality (===) compares BOTH value and data type without conversion (e.g. '5' === 5 evaluates to false).",
      "ALWAYS USE STRICT EQUALITY (===) to prevent unexpected type coercion bugs.",
      "Truthy vs Falsy: In JavaScript, false, 0, \"\", null, undefined, and NaN evaluate to false in conditions. All other values (including [] and {}) are truthy."
    ],
    keyPoints: [
      "Strict Equality (===): Verifies identical value and identical type. Never use loose ==.",
      "Falsy Values: 0, \"\", false, null, undefined, NaN.",
      "Logical Operators: && (AND), || (OR), ! (NOT), and ?? (Nullish Coalescing for null/undefined)."
    ],
    codeExample: `const enteredCode = "42";
const secretCode = 42;

// Loose equality (type coercion - converts string to number)
console.log(enteredCode == secretCode);  // true (Risky!)

// Strict equality (checks value AND type)
console.log(enteredCode === secretCode); // false (Safe & predictable!)

// Nullish Coalescing (??) provides fallback only for null/undefined
const playerTitle = null ?? "Wandering Adventurer";
console.log(playerTitle); // "Wandering Adventurer"`,
    questions: [
      "What is the difference between == (loose equality) and === (strict equality) in JavaScript?",
      "Name three values that are considered 'falsy' in JavaScript conditional statements.",
      "What does the nullish coalescing operator (??) do, and how does it differ from the logical OR (||) operator?"
    ]
  },

  "js-4": {
    title: "Loops",
    summary: [
      "Loops allow you to iterate over collections or repeat tasks in JavaScript.",
      "The 'for...of' loop is the modern standard for iterating directly over the values of an iterable collection (like an Array). It avoids manual index counters and prevents off-by-one errors.",
      "The 'for...in' loop iterates over enumerable property keys of an object (not recommended for arrays). While loops continue running as long as a boolean condition remains true."
    ],
    keyPoints: [
      "for...of: Iterates over VALUES of arrays, strings, sets, maps (for (const item of items)).",
      "for...in: Iterates over property KEYS of an object.",
      "for (let i = 0; i < n; i++): Standard index loop when index position is needed.",
      "Loop Controls: 'break' terminates loop; 'continue' skips to next iteration."
    ],
    codeExample: `const artifacts = ["Sun Stone", "Moon Ring", "Star Scepter"];

// Modern for...of loop (cleanly accesses values)
for (const item of artifacts) {
  console.log(\`Found artifact: \${item}\`);
}

// While loop
let dungeonFloor = 1;
while (dungeonFloor <= 3) {
  console.log(\`Clearing Floor #\${dungeonFloor}...\`);
  dungeonFloor++;
}`,
    questions: [
      "How does a for...of loop simplify iterating over the elements of an array compared to a traditional for loop?",
      "What is the difference between a for...of loop and a for...in loop in JavaScript?",
      "What do 'break' and 'continue' do when placed inside a JavaScript loop?"
    ]
  },

  "js-5": {
    title: "Functions",
    summary: [
      "Functions are first-class citizens in JavaScript: they can be stored in variables, passed as arguments to other functions, and returned from functions.",
      "Functions can be declared using standard function declarations ('function greet() { }') or arrow function expressions ('const greet = () => { }').",
      "PARAMETERS VS ARGUMENTS: A parameter is the named placeholder defined in the function declaration. An argument is the concrete value passed into the function when it is invoked."
    ],
    keyPoints: [
      "First-Class Functions: Functions can be assigned to variables and passed around like data.",
      "Parameters vs Arguments: Parameter = placeholder in definition; Argument = actual value passed on call.",
      "Arrow Functions: 'const add = (a, b) => a + b;' provides concise syntax and lexical 'this' binding.",
      "Default Parameters: Provide fallbacks: function attack(power = 10) { }."
    ],
    codeExample: `// 1. Standard function declaration with default parameter
function rollDice(sides = 6) {
  return Math.floor(Math.random() * sides) + 1;
}

// 2. Arrow function (concise syntax with implicit return)
const multiplyDamage = (base, mult) => base * mult;

const roll = rollDice(20); // 20 is the argument!
const total = multiplyDamage(roll, 1.5);
console.log(\`Rolled: \${roll} | Critical Damage: \${total}\`);`,
    questions: [
      "What is the difference between a function parameter and an argument in JavaScript?",
      "What is an arrow function, and how does its syntax differ from a traditional function declaration?",
      "What does it mean that functions are 'first-class citizens' in JavaScript?"
    ]
  },

  "js-6": {
    title: "Arrays & Array Methods",
    summary: [
      "JavaScript Arrays are dynamic lists of values equipped with powerful functional higher-order methods.",
      "MAP VS FILTER: The .map() method iterates through every element, applies a transformation, and returns a NEW array of the exact same length. The .filter() method tests each element against a boolean test and returns a NEW array containing only elements that passed.",
      "The .reduce() method aggregates all array elements down into a single final value (e.g. summing total gold). None of these methods modify the original array."
    ],
    keyPoints: [
      ".map(fn): Transforms each item, returns new array of same length.",
      ".filter(fn): Keeps items matching condition, returns subset array.",
      ".reduce(fn, init): Accumulates array items into a single final value.",
      ".includes(val): Checks if an array contains a specific item (returns true/false)."
    ],
    codeExample: `const scores = [10, 25, 40, 55, 70];

// 1. .filter() keeps scores >= 30
const highScores = scores.filter(s => s >= 30);
console.log(highScores); // [40, 55, 70]

// 2. .map() doubles each score
const doubled = highScores.map(s => s * 2);
console.log(doubled);    // [80, 110, 140]

// 3. .reduce() sums all scores
const totalScore = scores.reduce((sum, s) => sum + s, 0);
console.log(\`Total: \${totalScore}\`); // 200`,
    questions: [
      "What is the difference between the .map() method and the .filter() method on a JavaScript array?",
      "Does the .map() method change the length of the original array?",
      "What is the purpose of the second argument passed to .reduce() (e.g. scores.reduce(fn, 0))?"
    ]
  },

  "js-7": {
    title: "Objects",
    summary: [
      "Objects in JavaScript store keyed collections of properties and methods in key-value pairs.",
      "DOT VS BRACKET NOTATION: You use dot notation (obj.name) when the property name is a valid, static identifier. You MUST use bracket notation (obj[key]) when the property name is stored inside a variable, contains spaces, or starts with numbers.",
      "Objects are reference types: assigning an object to another variable simply copies the memory reference, not the actual data."
    ],
    keyPoints: [
      "Dot Notation: user.name (clean and standard for static keys).",
      "Bracket Notation: user[dynamicKey] (required when property name is in a variable).",
      "Methods: Functions stored as object properties.",
      "Object.keys() / Object.values(): Extracts arrays of keys or values from an object."
    ],
    codeExample: `const hero = {
  name: "Galahad",
  class: "Paladin",
  level: 15,
  stats: { health: 100, mana: 50 },
  attack() {
    return \`\${this.name} strikes with holy light!\`;
  }
};

// Accessing properties
console.log(hero.name);        // Dot notation: "Galahad"

const dynamicStat = "mana";
console.log(hero.stats[dynamicStat]); // Bracket notation: 50

console.log(hero.attack());`,
    questions: [
      "When must you access an object property using bracket notation obj[key] instead of dot notation obj.key?",
      "How do you define a method inside an object in JavaScript?",
      "What happens when you assign one object variable to another (e.g. const b = a)?"
    ]
  },

  "js-8": {
    title: "DOM Manipulation",
    summary: [
      "The DOM (Document Object Model) is a tree-like object representation of the webpage that JavaScript can read and manipulate in real-time.",
      "Selecting Elements: document.querySelector(selector) uses standard CSS selector strings to find the first matching element (e.g. '#my-id' or '.my-class'). document.querySelectorAll(selector) finds all matching elements.",
      "Modifying Elements: Update rendered text using element.textContent (safe from XSS attacks), change attributes with element.setAttribute() or element.id, and toggle CSS classes with element.classList.add() and .remove()."
    ],
    keyPoints: [
      "document.querySelector: Finds element using CSS selector syntax.",
      "element.textContent: Safely updates inner text without parsing HTML tags.",
      "element.classList: .add(), .remove(), .toggle() modify CSS classes smoothly.",
      "Avoid innerHTML: element.innerHTML parses HTML strings and opens security vulnerabilities (XSS) if user input is unescaped."
    ],
    codeExample: `// 1. Select element using CSS selector
const titleElement = document.querySelector("#lesson-topic-title");

// 2. Update text content safely
titleElement.textContent = "Chamber of JavaScript Lore";

// 3. Modify classes
titleElement.classList.add("revealed");

// 4. Create and append a new element
const newBadge = document.createElement("span");
newBadge.className = "wax-badge";
newBadge.textContent = "Rank S Master";
document.body.appendChild(newBadge);`,
    questions: [
      "How do you select an element with document.querySelector() and change its text content in JavaScript?",
      "Why is element.textContent preferred over element.innerHTML when displaying user input?",
      "How do you add or remove a CSS class from an element using JavaScript?"
    ]
  },

  "js-9": {
    title: "Events",
    summary: [
      "Events allow JavaScript to listen and respond to user interactions (clicks, keypresses, scrolls, form submissions).",
      "The addEventListener method (element.addEventListener('click', handlerFunction)) is the standard way to attach event listeners. It separates JavaScript behavior from HTML markup, supports multiple listeners on the same element, and allows clean removal with removeEventListener.",
      "EVENT OBJECT: Event listeners receive an Event object (e). Calling e.preventDefault() stops default browser actions (such as preventing a form submission from refreshing the entire page)."
    ],
    keyPoints: [
      "element.addEventListener('type', fn): Cleanly attaches event handlers.",
      "e.preventDefault(): Halts browser default behavior (e.g. form reload, link navigation).",
      "Event Bubbling: Events travel up the DOM tree from child to parents.",
      "Event Delegation: Attach a single listener to a parent container to handle events from multiple child items."
    ],
    codeExample: `const submitButton = document.querySelector("#btn-submit-answer");
const combatForm = document.querySelector("#combat-form");

// Listening for form submit event
combatForm.addEventListener("submit", (event) => {
  // CRITICAL: Stop browser from refreshing the page!
  event.preventDefault();

  console.log("Answers submitted for Arbiter evaluation!");
});`,
    questions: [
      "Why is element.addEventListener('click', fn) preferred over inline HTML onclick attributes?",
      "What does event.preventDefault() do when submitting an HTML form with JavaScript?",
      "What is event bubbling in JavaScript, and what is event delegation?"
    ]
  },

  "js-10": {
    title: "ES6+ Syntax",
    summary: [
      "ECMAScript 6 (ES6) and subsequent updates modernized JavaScript with clean, expressive syntax.",
      "Destructuring allows unpacking object properties or array elements directly into variables: const { name, level } = hero; or const [first, second] = items;.",
      "Template literals (enclosed in backticks `...`) allow multi-line strings and embedded variable interpolation with ${expression}.",
      "The Spread Operator (...) expands elements of an array or properties of an object: const clone = { ...original };."
    ],
    keyPoints: [
      "Template Literals: \`Hello \${user}\` replaces tedious string concatenation (+).",
      "Object Destructuring: const { title, hp } = enemy; unpacks matching properties.",
      "Spread Operator (...): Copies or merges arrays and objects: const merged = [...a, ...b];.",
      "Rest Parameters (...args): Gathers multiple arguments into a true array."
    ],
    codeExample: `const character = {
  heroName: "Lyra",
  rank: "Master",
  stats: { hp: 100, mana: 80 }
};

// 1. Object destructuring
const { heroName, rank } = character;
console.log(\`Hero: \${heroName} (\${rank})\`); // Template literal

// 2. Spread operator to shallow-copy and extend object
const upgradedHero = {
  ...character,
  rank: "Grandmaster", // Overwrites rank
  title: "Bane of Dragons"
};
console.log(upgradedHero.title);`,
    questions: [
      "How does object destructuring (const { name, age } = user) simplify extracting values from an object?",
      "What is the difference between single quotes (''), double quotes (\"\"), and template literals (``) in JavaScript?",
      "How does the spread operator (...) copy an array or object in JavaScript?"
    ]
  },

  "js-11": {
    title: "Asynchronous JS (Callbacks, Promises, async/await)",
    summary: [
      "JavaScript is single-threaded, meaning it can only execute one operation at a time on its main thread.",
      "If network requests were synchronous, the entire browser would freeze and become unresponsive while waiting for the server.",
      "Async/await is modern syntactic sugar over Promises. An 'async' function returns a Promise, and the 'await' keyword pauses execution of that specific function non-blockingly until the Promise resolves, allowing the browser to keep rendering and responding to clicks."
    ],
    keyPoints: [
      "Single-Threaded: JavaScript has one call stack and relies on the Event Loop for async tasks.",
      "Promise: Represents an asynchronous operation with three states: Pending, Fulfilled, Rejected.",
      "async/await: Write asynchronous code that reads sequentially like synchronous code.",
      "Error Handling: Always wrap 'await' calls in try...catch blocks to catch network rejections."
    ],
    codeExample: `// Asynchronous function simulating server request
async function fetchPlayerStats(playerId) {
  try {
    console.log("Communing with realm server...");
    // Await pauses this function without freezing the browser!
    const response = await fetch(\`https://api.example.com/players/\${playerId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network communing failed:", error.message);
  }
}`,
    questions: [
      "Why do we use async and await instead of running synchronous code when loading data from a server?",
      "What are the three states of a JavaScript Promise?",
      "Why must the 'await' keyword only be used inside an 'async' function?"
    ]
  },

  "js-12": {
    title: "Fetch API / Axios",
    summary: [
      "The Fetch API provides a modern, Promise-based interface for making HTTP network requests in the browser.",
      "Calling fetch(url, options) returns a Promise that resolves to a Response object representing HTTP headers and status.",
      "TWO-STEP PROCESS: Because HTTP response bodies arrive as data streams, you must call and await response.json() to read the stream to completion and parse the JSON text into a JavaScript object.",
      "Fetch only rejects on network failure (offline); it does NOT reject on HTTP 404 or 500 errors! You must check if (!response.ok) manually."
    ],
    keyPoints: [
      "fetch(url): Initiates HTTP request via native browser fetch.",
      "await response.json(): Reads stream and parses JSON payload into JS object.",
      "response.ok: Boolean indicating if HTTP status is in the 200-299 range.",
      "POST Requests: Pass method: 'POST', headers: { 'Content-Type': 'application/json' }, and body: JSON.stringify(data)."
    ],
    codeExample: `// Making a POST request to an AI grading endpoint
async function consultArbiter(answersData) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY_HERE"
    },
    body: JSON.stringify(answersData) // Serialize to JSON string
  });

  // Verify HTTP status code
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  // Parse stream body into JS object
  const result = await response.json();
  return result;
}`,
    questions: [
      "What does the fetch() function return, and why do you have to call response.json() before using the data?",
      "Why does fetch() not throw an error on an HTTP 404 or 500 error, and what property should you check?",
      "How do you send JSON data in a POST request using the Fetch API?"
    ]
  },

  "js-13": {
    title: "Error Handling (try/catch)",
    summary: [
      "Runtime errors (like network dropouts or parsing malformed data) halt program execution if left unhandled.",
      "The try...catch statement wraps risky operations. If an error occurs in the 'try' block, execution jumps to the 'catch(error)' block, allowing the application to display a helpful message and continue running safely.",
      "The optional 'finally' block always executes unconditionally after try and catch finish, making it ideal for resetting UI spinners and disabling loading indicators."
    ],
    keyPoints: [
      "try: Wraps code that might fail.",
      "catch (err): Intercepts the error object (err.message, err.name).",
      "finally: Guaranteed cleanup execution (e.g. re-enabling submit buttons).",
      "throw new Error('msg'): Manually raises a custom exception."
    ],
    codeExample: `async function submitCombatTrial() {
  const button = document.querySelector("#btn-submit");
  button.disabled = true; // Show loading state

  try {
    const grade = await gradePlayerAnswer(answers);
    displayGradeSeal(grade);
  } catch (error) {
    // Graceful recovery: inform user without crashing
    showValidationError(error.message);
  } finally {
    // Guaranteed cleanup: re-enable UI
    button.disabled = false;
  }
}`,
    questions: [
      "How does wrapping risky code in a try...catch block prevent an entire web application from crashing?",
      "What information does the error object passed to catch(error) provide?",
      "When is the 'finally' block guaranteed to execute?"
    ]
  },

  "js-14": {
    title: "Closures & Scope",
    summary: [
      "A Closure is the combination of a function bundled together with references to its surrounding lexical environment.",
      "In JavaScript, inner functions have access to variables declared in their outer enclosing functions. When an inner function references outer variables, JavaScript preserves that environment in memory even after the outer function has finished executing.",
      "Closures power data privacy (private variables), factory functions, and state management in JavaScript."
    ],
    keyPoints: [
      "Lexical Scope: Scope is determined at write time by function location.",
      "Closure: An inner function remembers variables from its outer enclosing function.",
      "Data Encapsulation: Allows creating private variables that cannot be accessed directly from outside."
    ],
    codeExample: `// Factory function creating a closure
function createAdventurer(name) {
  let experience = 0; // Private variable enclosed in scope!

  return {
    gainExp(amount) {
      experience += amount;
      console.log(\`\${name} gained \${amount} EXP! Total: \${experience}\`);
    },
    getExp() {
      return experience;
    }
  };
}

const hero = createAdventurer("Eldrin");
hero.gainExp(50); // Output: Eldrin gained 50 EXP! Total: 50
// console.log(hero.experience); // undefined! experience is private and protected.`,
    questions: [
      "What is a closure in JavaScript, and how does an inner function retain access to variables from its outer function?",
      "How can closures be used to create private variables in JavaScript?",
      "What is lexical scope in JavaScript?"
    ]
  },

  "js-15": {
    title: "JSON Handling",
    summary: [
      "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format based on JavaScript object syntax.",
      "JSON.stringify(object): Converts a JavaScript object or array into a formatted JSON text string for saving to localStorage or sending over HTTP.",
      "JSON.parse(string): Converts a valid JSON text string back into a live JavaScript object or array in memory.",
      "FORMAT DIFFERENCE: In JSON, all keys must be enclosed in double quotes (\"key\"), and functions or undefined are not permitted."
    ],
    keyPoints: [
      "JSON.stringify(): Object -> JSON String (Serialization).",
      "JSON.parse(): JSON String -> Object (Deserialization).",
      "Strict Format: All keys must be double-quoted. Trailing commas are illegal.",
      "LocalStorage Pairing: Must use JSON.stringify to save objects, and JSON.parse to read them."
    ],
    codeExample: `const player = {
  name: "Rowan",
  level: 8,
  inventory: ["sword", "compass"]
};

// 1. Serialize object to JSON text string for storage
const jsonString = JSON.stringify(player);
console.log(typeof jsonString); // "string"
console.log(jsonString);        // '{"name":"Rowan","level":8,"inventory":["sword","compass"]}'

// 2. Deserialize JSON string back to live JavaScript object
const restoredPlayer = JSON.parse(jsonString);
console.log(restoredPlayer.name); // "Rowan" (Object property access)`,
    questions: [
      "What is the difference between JSON.stringify() and JSON.parse() when working with JavaScript objects?",
      "Why must you use JSON.stringify() when saving a JavaScript object into browser localStorage?",
      "What are two strict formatting rules that distinguish JSON from standard JavaScript object literals?"
    ]
  },

  "js-16": {
    title: "Modules (import/export)",
    summary: [
      "ES Modules (ESM) organize JavaScript code into separate, reusable files with explicitly defined inputs and outputs using 'import' and 'export'.",
      "NAMED EXPORTS: A file can have multiple named exports (export const a = 1; export function b() {}). They must be imported inside curly braces using matching names: import { a, b } from './file.js'.",
      "DEFAULT EXPORT: A file can have only ONE default export (export default class MyClass {}). It is imported without curly braces using any arbitrary identifier name: import MyClass from './file.js'.",
      "In HTML, scripts using modules must specify type=\"module\": <script type=\"module\" src=\"main.js\"></script>."
    ],
    keyPoints: [
      "Named Exports: Multiple per file (export const x = 1;). Imported with { x }.",
      "Default Export: One per file (export default obj;). Imported without curly braces.",
      "Strict Mode: ES Modules run in strict mode ('use strict') automatically.",
      "<script type=\"module\">: Mandatory HTML attribute to activate ES module features."
    ],
    codeExample: `// Inside math_utils.js:
export const PI = 3.14159; // Named export
export function calculateArea(radius) { // Named export
  return PI * radius * radius;
}
export default function multiply(a, b) { // Default export
  return a * b;
}

// Inside main.js:
import multiply, { PI, calculateArea } from "./math_utils.js";
console.log(\`Circle area: \${calculateArea(5)}\`);
console.log(\`Multiply: \${multiply(4, 5)}\`);`,
    questions: [
      "What is the difference between a named export and a default export when using JavaScript ES modules?",
      "Why must the script tag in HTML include type=\"module\" when importing ES modules?",
      "Can a JavaScript file have multiple default exports?"
    ]
  }
};
