/**
 * File: js/service/topicService.js
 * Responsibility: Handles all database and demo data operations related to campaign topics.
 * Manages the multi-language syllabus (Python, C#, C++, HTML, CSS, JavaScript) across
 * three tiers (Foundations, Core, Advanced), enforcing sequential and tier-based unlocking.
 * Never touches the DOM — only returns pure data or throws an ApiException.
 */

import { ApiException, handleApiError } from "../../exception/apiException.js";
import { getChamberLessonData } from "./lessonDatabase.js";

// Multi-Language Worlds Definition
export const WORLDS = [
  { id: "python", name: "Python", icon: "🐍", subtitle: "The Serpent Spire" },
  { id: "csharp", name: "C#", icon: "⚔️", subtitle: "The Citadel of Types" },
  { id: "cpp", name: "C++", icon: "⚡", subtitle: "The Memory Forge" },
  { id: "html", name: "HTML", icon: "📜", subtitle: "The Semantic Archive" },
  { id: "css", name: "CSS", icon: "🎨", subtitle: "The Atelier of Styles" },
  { id: "javascript", name: "JavaScript", icon: "🔮", subtitle: "The Dynamic Astral" }
];

// Offline starter syllabus covering all 6 worlds and 3 tiers
const SYLLABUS_DATA = {
  python: [
    // Tier 1 — Foundations
    { id: "py-1", world: "python", tier: 1, tier_name: "Foundations", title: "Variables & Data Types", description: "Learn how Python stores integers, floats, strings, and booleans.", order_index: 1, status: "unlocked", is_completed: false, boss_question: "How does Python determine the data type of a variable, and what is the difference between an integer and a float?" },
    { id: "py-2", world: "python", tier: 1, tier_name: "Foundations", title: "Operators & Expressions", description: "Perform arithmetic, comparison, and boolean logic in Python.", order_index: 2, status: "locked", is_completed: false, boss_question: "What is the difference between the / operator and the // operator in Python?" },
    { id: "py-3", world: "python", tier: 1, tier_name: "Foundations", title: "Input / Output", description: "Communicate with the user via print() and input().", order_index: 3, status: "locked", is_completed: false, boss_question: "What data type does the input() function return by default, and how do you convert it to a number?" },
    { id: "py-4", world: "python", tier: 1, tier_name: "Foundations", title: "Conditional Statements (if / elif / else)", description: "Control execution flow using Python conditional branching.", order_index: 4, status: "locked", is_completed: false, boss_question: "How does Python use indentation to define blocks of code inside an if/elif/else statement?" },
    { id: "py-5", world: "python", tier: 1, tier_name: "Foundations", title: "Loops (for, while)", description: "Iterate through sequences and repeat actions until conditions change.", order_index: 5, status: "locked", is_completed: false, boss_question: "When would you choose to use a for loop with range() instead of a while loop in Python?" },
    // Tier 2 — Core
    { id: "py-6", world: "python", tier: 2, tier_name: "Core", title: "Functions & Parameters", description: "Define reusable procedures with def and return values.", order_index: 6, status: "locked", is_completed: false, boss_question: "How do default parameter values work in Python functions, and why must they come after non-default parameters?" },
    { id: "py-7", world: "python", tier: 2, tier_name: "Core", title: "Lists & Tuples", description: "Store ordered collections and understand mutability vs immutability.", order_index: 7, status: "locked", is_completed: false, boss_question: "What is the primary difference between a Python list and a tuple, and when should you choose a tuple?" },
    { id: "py-8", world: "python", tier: 2, tier_name: "Core", title: "Dictionaries & Sets", description: "Work with key-value pairs and unique collections of items.", order_index: 8, status: "locked", is_completed: false, boss_question: "How does a Python dictionary store data using key-value pairs, and why can sets not contain duplicate values?" },
    { id: "py-9", world: "python", tier: 2, tier_name: "Core", title: "String Manipulation", description: "Format, slice, and transform text using Python string methods.", order_index: 9, status: "locked", is_completed: false, boss_question: "How does string slicing with [start:stop:step] work in Python?" },
    { id: "py-10", world: "python", tier: 2, tier_name: "Core", title: "File Handling", description: "Open, read, write, and safely close files using context managers.", order_index: 10, status: "locked", is_completed: false, boss_question: "Why is it best practice to use the 'with open(...)' statement when reading or writing files in Python?" },
    { id: "py-11", world: "python", tier: 2, tier_name: "Core", title: "Exception Handling", description: "Catch and handle errors gracefully using try, except, and finally.", order_index: 11, status: "locked", is_completed: false, boss_question: "What is the purpose of the try-except block in Python, and when does the finally block execute?" },
    // Tier 3 — Advanced
    { id: "py-12", world: "python", tier: 3, tier_name: "Advanced", title: "OOP — Classes & Objects", description: "Model entities with classes, attributes, and the __init__ constructor.", order_index: 12, status: "locked", is_completed: false, boss_question: "What is the purpose of the __init__ method in a Python class, and what does the 'self' parameter represent?" },
    { id: "py-13", world: "python", tier: 3, tier_name: "Advanced", title: "OOP — Inheritance & Polymorphism", description: "Derive child classes and override parent class behavior.", order_index: 13, status: "locked", is_completed: false, boss_question: "How does a child class inherit methods from a parent class in Python, and how do you call the parent method using super()?" },
    { id: "py-14", world: "python", tier: 3, tier_name: "Advanced", title: "Modules & Packages", description: "Organize Python projects into modular files and import packages.", order_index: 14, status: "locked", is_completed: false, boss_question: "What is the difference between a Python module and a package, and what does __name__ == '__main__' do?" },
    { id: "py-15", world: "python", tier: 3, tier_name: "Advanced", title: "List/Dict Comprehensions", description: "Write concise, expressive transformations for lists and dictionaries.", order_index: 15, status: "locked", is_completed: false, boss_question: "How does a list comprehension create a new list compared to a standard for loop, and how can you add a condition to it?" },
    { id: "py-16", world: "python", tier: 3, tier_name: "Advanced", title: "Decorators & Generators", description: "Enhance functions with @decorators and yield values with generators.", order_index: 16, status: "locked", is_completed: false, boss_question: "What does the 'yield' keyword do inside a Python generator function, and how does it save memory compared to returning a full list?" }
  ],

  csharp: [
    // Tier 1 — Foundations
    { id: "cs-1", world: "csharp", tier: 1, tier_name: "Foundations", title: "Variables & Data Types", description: "Explore C# strongly typed values including int, double, string, and bool.", order_index: 1, status: "unlocked", is_completed: false, boss_question: "What does it mean that C# is a statically-typed language, and what is the difference between value types and reference types?" },
    { id: "cs-2", world: "csharp", tier: 1, tier_name: "Foundations", title: "Operators & Expressions", description: "Use arithmetic, comparison, and compound operators.", order_index: 2, status: "locked", is_completed: false, boss_question: "How does the modulus operator (%) work in C#, and how can you use it to check if a number is even or odd?" },
    { id: "cs-3", world: "csharp", tier: 1, tier_name: "Foundations", title: "Console I/O", description: "Read from and write to the terminal with Console.WriteLine and ReadLine.", order_index: 3, status: "locked", is_completed: false, boss_question: "Why must you use int.Parse() or Convert.ToInt32() when reading user input from Console.ReadLine() in C#?" },
    { id: "cs-4", world: "csharp", tier: 1, tier_name: "Foundations", title: "Conditional Statements", description: "Make decisions with if, else if, else, and switch statements.", order_index: 4, status: "locked", is_completed: false, boss_question: "When is it cleaner to use a switch statement instead of multiple if-else if branches in C#?" },
    { id: "cs-5", world: "csharp", tier: 1, tier_name: "Foundations", title: "Loops", description: "Repeat actions with for, while, and foreach loops.", order_index: 5, status: "locked", is_completed: false, boss_question: "How does a foreach loop differ from a standard for loop when iterating over an array in C#?" },
    // Tier 2 — Core
    { id: "cs-6", world: "csharp", tier: 2, tier_name: "Core", title: "Methods & Parameters", description: "Encapsulate logic into methods with return types and parameters.", order_index: 6, status: "locked", is_completed: false, boss_question: "What does the 'void' return type mean on a C# method, and what is the difference between passing by value versus using the 'ref' keyword?" },
    { id: "cs-7", world: "csharp", tier: 2, tier_name: "Core", title: "Arrays & Collections (List)", description: "Store elements in fixed-size arrays and dynamic List<T> collections.", order_index: 7, status: "locked", is_completed: false, boss_question: "What is the main advantage of using a List<T> over a standard fixed-size array in C#?" },
    { id: "cs-8", world: "csharp", tier: 2, tier_name: "Core", title: "Strings", description: "Format strings using interpolation ($'...') and manipulate text.", order_index: 8, status: "locked", is_completed: false, boss_question: "Why are C# strings immutable, and how does string interpolation ($'Hello {name}') simplify string formatting?" },
    { id: "cs-9", world: "csharp", tier: 2, tier_name: "Core", title: "Exception Handling", description: "Handle runtime errors cleanly with try, catch, and finally blocks.", order_index: 9, status: "locked", is_completed: false, boss_question: "Why should you catch specific exceptions (like FormatException) instead of only catching the general Exception class in C#?" },
    { id: "cs-10", world: "csharp", tier: 2, tier_name: "Core", title: "Structs vs Classes", description: "Understand stack-allocated value types versus heap-allocated reference types.", order_index: 10, status: "locked", is_completed: false, boss_question: "What is the core difference between a struct (value type) and a class (reference type) in C# memory management?" },
    // Tier 3 — Advanced
    { id: "cs-11", world: "csharp", tier: 3, tier_name: "Advanced", title: "OOP — Classes, Inheritance, Interfaces", description: "Build class hierarchies and implement interface contracts.", order_index: 11, status: "locked", is_completed: false, boss_question: "What is an interface in C#, and how does implementing an interface differ from inheriting a class?" },
    { id: "cs-12", world: "csharp", tier: 3, tier_name: "Advanced", title: "Properties & Encapsulation", description: "Protect object state with getters, setters, and access modifiers.", order_index: 12, status: "locked", is_completed: false, boss_question: "Why do C# developers use properties with { get; set; } instead of making class fields public?" },
    { id: "cs-13", world: "csharp", tier: 3, tier_name: "Advanced", title: "Delegates & Events", description: "Pass methods as parameters and notify subscribers of actions.", order_index: 13, status: "locked", is_completed: false, boss_question: "What is a delegate in C#, and how do events provide a safe way for objects to broadcast notifications?" },
    { id: "cs-14", world: "csharp", tier: 3, tier_name: "Advanced", title: "LINQ", description: "Query collections using Language Integrated Query operations.", order_index: 14, status: "locked", is_completed: false, boss_question: "What do the LINQ methods .Where() and .Select() do when querying a collection of items in C#?" },
    { id: "cs-15", world: "csharp", tier: 3, tier_name: "Advanced", title: "Generics", description: "Write type-safe, reusable algorithms with generic classes and methods.", order_index: 15, status: "locked", is_completed: false, boss_question: "Why are C# Generics (<T>) better for performance and safety than using general object types and casting?" },
    { id: "cs-16", world: "csharp", tier: 3, tier_name: "Advanced", title: "File I/O", description: "Read, write, and append text files using File and StreamReader.", order_index: 16, status: "locked", is_completed: false, boss_question: "How does File.ReadAllText() simplify reading a file in C#, and why should stream resources be wrapped in a using statement?" }
  ],

  cpp: [
    // Tier 1 — Foundations
    { id: "cpp-1", world: "cpp", tier: 1, tier_name: "Foundations", title: "Variables & Data Types", description: "Learn primitive types, sizes, and declarations in C++.", order_index: 1, status: "unlocked", is_completed: false, boss_question: "What is the difference between an int, a float, and a char in C++, and why does C++ require declaring types upfront?" },
    { id: "cpp-2", world: "cpp", tier: 1, tier_name: "Foundations", title: "Operators", description: "Perform arithmetic, relational, and logical operations.", order_index: 2, status: "locked", is_completed: false, boss_question: "What is the difference between prefix increment (++x) and postfix increment (x++) in C++?" },
    { id: "cpp-3", world: "cpp", tier: 1, tier_name: "Foundations", title: "I/O (cin / cout)", description: "Input and output with streams from the <iostream> header.", order_index: 3, status: "locked", is_completed: false, boss_question: "How do std::cin and std::cout use the stream operators >> and << to read and write data in C++?" },
    { id: "cpp-4", world: "cpp", tier: 1, tier_name: "Foundations", title: "Conditional Statements", description: "Branch code using if, else if, else, and ternary operators.", order_index: 4, status: "locked", is_completed: false, boss_question: "How does the ternary conditional operator (condition ? expr1 : expr2) provide a shorthand for if-else in C++?" },
    { id: "cpp-5", world: "cpp", tier: 1, tier_name: "Foundations", title: "Loops", description: "Master for, while, and do-while loops in C++.", order_index: 5, status: "locked", is_completed: false, boss_question: "What is the key difference between a while loop and a do-while loop in C++?" },
    // Tier 2 — Core
    { id: "cpp-6", world: "cpp", tier: 2, tier_name: "Core", title: "Functions & Function Overloading", description: "Declare prototypes and write overloaded functions.", order_index: 6, status: "locked", is_completed: false, boss_question: "What is function overloading in C++, and how does the compiler know which overloaded version to call?" },
    { id: "cpp-7", world: "cpp", tier: 2, tier_name: "Core", title: "Arrays & Strings", description: "Work with C-style arrays and the modern std::string class.", order_index: 7, status: "locked", is_completed: false, boss_question: "Why is std::string generally preferred over raw C-style null-terminated char arrays in modern C++?" },
    { id: "cpp-8", world: "cpp", tier: 2, tier_name: "Core", title: "Pointers & References", description: "Understand memory addresses, dereferencing, and aliases.", order_index: 8, status: "locked", is_completed: false, boss_question: "What is the difference between a pointer (*) and a reference (&) in C++, and can a reference be reassigned?" },
    { id: "cpp-9", world: "cpp", tier: 2, tier_name: "Core", title: "Structures", description: "Bundle related variables into custom composite data types.", order_index: 9, status: "locked", is_completed: false, boss_question: "How do you define a struct in C++, and how do you access its members using dot notation versus pointer arrow notation (->)?" },
    { id: "cpp-10", world: "cpp", tier: 2, tier_name: "Core", title: "Dynamic Memory (new / delete)", description: "Allocate memory on the heap and prevent memory leaks.", order_index: 10, status: "locked", is_completed: false, boss_question: "What happens if memory allocated with 'new' in C++ is never freed with 'delete'? What is this issue called?" },
    // Tier 3 — Advanced
    { id: "cpp-11", world: "cpp", tier: 3, tier_name: "Advanced", title: "OOP — Constructors, Destructors, Inheritance", description: "Build classes with lifecycle methods and derive subclasses.", order_index: 11, status: "locked", is_completed: false, boss_question: "When is a destructor called in C++, and why are destructors essential for cleaning up resources?" },
    { id: "cpp-12", world: "cpp", tier: 3, tier_name: "Advanced", title: "Polymorphism & Virtual Functions", description: "Enable runtime dynamic dispatch with virtual methods.", order_index: 12, status: "locked", is_completed: false, boss_question: "What is the purpose of the 'virtual' keyword in a C++ base class method, and what happens if it is omitted?" },
    { id: "cpp-13", world: "cpp", tier: 3, tier_name: "Advanced", title: "Templates", description: "Write generic functions and classes that work with any type.", order_index: 13, status: "locked", is_completed: false, boss_question: "How does a template function (template <typename T>) allow you to write one function that works for ints, floats, and strings?" },
    { id: "cpp-14", world: "cpp", tier: 3, tier_name: "Advanced", title: "STL (vectors, maps, iterators)", description: "Harness the Standard Template Library for fast data structures.", order_index: 14, status: "locked", is_completed: false, boss_question: "What is std::vector in C++, and why is vector::push_back() more flexible than a traditional fixed array?" },
    { id: "cpp-15", world: "cpp", tier: 3, tier_name: "Advanced", title: "Exception Handling", description: "Throw, catch, and handle exceptions in C++.", order_index: 15, status: "locked", is_completed: false, boss_question: "How do the throw, try, and catch keywords work together to handle unexpected runtime errors in C++?" },
    { id: "cpp-16", world: "cpp", tier: 3, tier_name: "Advanced", title: "File Handling", description: "Read and write disk files with ifstream and ofstream.", order_index: 16, status: "locked", is_completed: false, boss_question: "How do std::ifstream and std::ofstream open and close files for reading and writing in C++?" }
  ],

  html: [
    // Tier 1 — Foundations
    { id: "html-1", world: "html", tier: 1, tier_name: "Foundations", title: "Document Structure & Tags", description: "Understand the basic skeleton: <!DOCTYPE>, <html>, <head>, and <body>.", order_index: 1, status: "unlocked", is_completed: false, boss_question: "What is the purpose of the <!DOCTYPE html> declaration at the very top of an HTML document?" },
    { id: "html-2", world: "html", tier: 1, tier_name: "Foundations", title: "Headings & Text Formatting", description: "Structure written content with <h1> to <h6>, <p>, and <strong>.", order_index: 2, status: "locked", is_completed: false, boss_question: "Why should a webpage generally only have one <h1> element, and how does heading hierarchy help accessibility?" },
    { id: "html-3", world: "html", tier: 1, tier_name: "Foundations", title: "Lists", description: "Organize items using ordered (<ol>) and unordered (<ul>) lists.", order_index: 3, status: "locked", is_completed: false, boss_question: "What is the difference between an ordered list (<ol>) and an unordered list (<ul>) in HTML?" },
    { id: "html-4", world: "html", tier: 1, tier_name: "Foundations", title: "Links & Images", description: "Connect pages with <a> anchors and embed images with <img>.", order_index: 4, status: "locked", is_completed: false, boss_question: "Why is the 'alt' attribute on an <img> tag essential, and what does the 'href' attribute do on an <a> tag?" },
    { id: "html-5", world: "html", tier: 1, tier_name: "Foundations", title: "Tables", description: "Format tabular data using <table>, <tr>, <th>, and <td>.", order_index: 5, status: "locked", is_completed: false, boss_question: "What is the difference between a table header cell (<th>) and a regular table data cell (<td>) in HTML?" },
    // Tier 2 — Core
    { id: "html-6", world: "html", tier: 2, tier_name: "Core", title: "Forms & Input Elements", description: "Collect user data with <form>, <input>, <select>, and <button>.", order_index: 6, status: "locked", is_completed: false, boss_question: "How does the 'type' attribute on an <input> element change how it behaves (for example, text vs checkbox vs submit)?" },
    { id: "html-7", world: "html", tier: 2, tier_name: "Core", title: "Semantic HTML5 Elements", description: "Use meaningful tags: <header>, <nav>, <main>, <article>, and <footer>.", order_index: 7, status: "locked", is_completed: false, boss_question: "Why is using semantic elements like <header>, <main>, and <nav> better than wrapping everything inside generic <div> tags?" },
    { id: "html-8", world: "html", tier: 2, tier_name: "Core", title: "Div/Span & Layout Structure", description: "Understand block-level <div> vs inline <span> containers.", order_index: 8, status: "locked", is_completed: false, boss_question: "What is the difference between a block-level element like <div> and an inline element like <span>?" },
    { id: "html-9", world: "html", tier: 2, tier_name: "Core", title: "Multimedia (audio/video)", description: "Embed sound and video natively using <audio> and <video>.", order_index: 9, status: "locked", is_completed: false, boss_question: "What does the 'controls' attribute do when added to an HTML5 <video> tag?" },
    { id: "html-10", world: "html", tier: 2, tier_name: "Core", title: "Meta Tags & SEO Basics", description: "Configure character sets, viewports, and search engine snippets.", order_index: 10, status: "locked", is_completed: false, boss_question: "Why is the <meta name='viewport' content='...'> tag essential for building mobile-friendly websites?" },
    // Tier 3 — Advanced
    { id: "html-11", world: "html", tier: 3, tier_name: "Advanced", title: "Accessibility (ARIA basics)", description: "Make websites usable for screen readers with roles and aria attributes.", order_index: 11, status: "locked", is_completed: false, boss_question: "What is the purpose of ARIA attributes (like aria-label and role) in HTML, and when should they be used?" },
    { id: "html-12", world: "html", tier: 3, tier_name: "Advanced", title: "Form Validation Attributes", description: "Validate forms natively with required, min, max, and pattern.", order_index: 12, status: "locked", is_completed: false, boss_question: "How does the HTML 'required' attribute prevent a form from submitting invalid data without using JavaScript?" },
    { id: "html-13", world: "html", tier: 3, tier_name: "Advanced", title: "Embedding & iframes", description: "Embed external pages and widgets securely using <iframe>.", order_index: 13, status: "locked", is_completed: false, boss_question: "What is an <iframe> used for in HTML, and why is the 'sandbox' attribute recommended for security?" },
    { id: "html-14", world: "html", tier: 3, tier_name: "Advanced", title: "HTML5 APIs Overview (Canvas, LocalStorage)", description: "Explore web graphics with <canvas> and client-side web storage.", order_index: 14, status: "locked", is_completed: false, boss_question: "What is the difference between drawing pixels on an HTML <canvas> and storing data in browser localStorage?" }
  ],

  css: [
    // Tier 1 — Foundations
    { id: "css-1", world: "css", tier: 1, tier_name: "Foundations", title: "Selectors & Specificity", description: "Target elements by tag, class, and ID, and resolve style conflicts.", order_index: 1, status: "unlocked", is_completed: false, boss_question: "Which selector has higher specificity in CSS: an ID selector (#hero) or a class selector (.hero), and why?" },
    { id: "css-2", world: "css", tier: 1, tier_name: "Foundations", title: "The Box Model", description: "Master content, padding, border, and margin dimensions.", order_index: 2, status: "locked", is_completed: false, boss_question: "What are the four components of the CSS Box Model, and how does box-sizing: border-box affect element width?" },
    { id: "css-3", world: "css", tier: 1, tier_name: "Foundations", title: "Colors & Units", description: "Use hex, rgb, rem, px, and viewport units (vh/vw).", order_index: 3, status: "locked", is_completed: false, boss_question: "What is the difference between pixels (px) and rem units in CSS, and why are rem units preferred for typography?" },
    { id: "css-4", world: "css", tier: 1, tier_name: "Foundations", title: "Typography", description: "Style fonts, line-height, text alignment, and load web fonts.", order_index: 4, status: "locked", is_completed: false, boss_question: "How do font-family, font-size, and line-height work together to make text readable on a webpage?" },
    { id: "css-5", world: "css", tier: 1, tier_name: "Foundations", title: "Backgrounds & Borders", description: "Apply colors, images, border-radius, and shadows.", order_index: 5, status: "locked", is_completed: false, boss_question: "How does border-radius round the corners of an element, and how do you make a square element completely circular?" },
    // Tier 2 — Core
    { id: "css-6", world: "css", tier: 2, tier_name: "Core", title: "Flexbox", description: "Align and distribute items along a single axis with display: flex.", order_index: 6, status: "locked", is_completed: false, boss_question: "What is the difference between justify-content (main axis) and align-items (cross axis) in CSS Flexbox?" },
    { id: "css-7", world: "css", tier: 2, tier_name: "Core", title: "Grid Layout", description: "Design two-dimensional layouts with grid-template-columns and gaps.", order_index: 7, status: "locked", is_completed: false, boss_question: "When would you choose CSS Grid over CSS Flexbox to lay out components on a page?" },
    { id: "css-8", world: "css", tier: 2, tier_name: "Core", title: "Positioning (relative / absolute / fixed)", description: "Control element placement within the document flow.", order_index: 8, status: "locked", is_completed: false, boss_question: "What is the difference between position: relative, position: absolute, and position: fixed in CSS?" },
    { id: "css-9", world: "css", tier: 2, tier_name: "Core", title: "Responsive Design & Media Queries", description: "Adapt designs across mobile, tablet, and desktop viewports.", order_index: 9, status: "locked", is_completed: false, boss_question: "How does a CSS @media query with (max-width: 768px) allow a website to change its layout on mobile phones?" },
    { id: "css-10", world: "css", tier: 2, tier_name: "Core", title: "Pseudo-classes & Pseudo-elements", description: "Style hover states (:hover) and generate content (::before, ::after).", order_index: 10, status: "locked", is_completed: false, boss_question: "What is the difference between a pseudo-class like :hover and a pseudo-element like ::before in CSS?" },
    // Tier 3 — Advanced
    { id: "css-11", world: "css", tier: 3, tier_name: "Advanced", title: "CSS Variables (Custom Properties)", description: "Declare and reuse tokens like --accent-color in :root.", order_index: 11, status: "locked", is_completed: false, boss_question: "Why are CSS Variables (--my-color) declared in :root, and how do you use the var() function to apply them?" },
    { id: "css-12", world: "css", tier: 3, tier_name: "Advanced", title: "Animations & Transitions", description: "Smoothly animate property changes with transition and @keyframes.", order_index: 12, status: "locked", is_completed: false, boss_question: "What is the difference between a simple CSS transition and a multi-step @keyframes animation?" },
    { id: "css-13", world: "css", tier: 3, tier_name: "Advanced", title: "Transform", description: "Rotate, scale, translate, and skew elements in 2D and 3D space.", order_index: 13, status: "locked", is_completed: false, boss_question: "Why is transform: translateY(-5px) better for animation performance than changing the top or margin property?" },
    { id: "css-14", world: "css", tier: 3, tier_name: "Advanced", title: "CSS Architecture Basics (BEM naming)", description: "Structure scalable stylesheets using Block__Element--Modifier.", order_index: 14, status: "locked", is_completed: false, boss_question: "What do the Block, Element, and Modifier stand for in the BEM CSS naming convention, and why is it useful?" }
  ],

  javascript: [
    // Tier 1 — Foundations
    { id: "js-1", world: "javascript", tier: 1, tier_name: "Foundations", title: "Variables (var / let / const)", description: "Understand scoping and reassignability across variable keywords.", order_index: 1, status: "unlocked", is_completed: false, boss_question: "What is the difference between 'let' and 'const' in JavaScript, and why should you avoid using 'var'?" },
    { id: "js-2", world: "javascript", tier: 1, tier_name: "Foundations", title: "Data Types & Operators", description: "Master numbers, strings, booleans, null, undefined, and operators.", order_index: 2, status: "locked", is_completed: false, boss_question: "What is the difference between null and undefined in JavaScript?" },
    { id: "js-3", world: "javascript", tier: 1, tier_name: "Foundations", title: "Conditionals", description: "Compare values and make decisions with if/else and strict equality (===).", order_index: 3, status: "locked", is_completed: false, boss_question: "What is the difference between == (loose equality) and === (strict equality) in JavaScript?" },
    { id: "js-4", world: "javascript", tier: 1, tier_name: "Foundations", title: "Loops", description: "Repeat actions with for, while, and for...of loops.", order_index: 4, status: "locked", is_completed: false, boss_question: "How does a for...of loop simplify iterating over the elements of an array compared to a traditional for loop?" },
    { id: "js-5", world: "javascript", tier: 1, tier_name: "Foundations", title: "Functions", description: "Write reusable functions, pass parameters, and return values.", order_index: 5, status: "locked", is_completed: false, boss_question: "What is the difference between a function parameter and an argument in JavaScript?" },
    // Tier 2 — Core
    { id: "js-6", world: "javascript", tier: 2, tier_name: "Core", title: "Arrays & Array Methods", description: "Manipulate lists using map, filter, forEach, and reduce.", order_index: 6, status: "locked", is_completed: false, boss_question: "What is the difference between the .map() method and the .filter() method on a JavaScript array?" },
    { id: "js-7", world: "javascript", tier: 2, tier_name: "Core", title: "Objects", description: "Model data with key-value pairs and access properties.", order_index: 7, status: "locked", is_completed: false, boss_question: "When must you access an object property using bracket notation obj[key] instead of dot notation obj.key?" },
    { id: "js-8", world: "javascript", tier: 2, tier_name: "Core", title: "DOM Manipulation", description: "Select elements and modify text, attributes, and styles dynamically.", order_index: 8, status: "locked", is_completed: false, boss_question: "How do you select an element with document.querySelector() and change its text content in JavaScript?" },
    { id: "js-9", world: "javascript", tier: 2, tier_name: "Core", title: "Events", description: "Listen and respond to user clicks, keypresses, and submissions.", order_index: 9, status: "locked", is_completed: false, boss_question: "Why is element.addEventListener('click', fn) preferred over inline HTML onclick attributes?" },
    { id: "js-10", world: "javascript", tier: 2, tier_name: "Core", title: "ES6+ Syntax (arrow functions, template literals, destructuring)", description: "Write modern, expressive JavaScript with ES6 features.", order_index: 10, status: "locked", is_completed: false, boss_question: "How does object destructuring (const { name, age } = user) simplify extracting values from an object?" },
    // Tier 3 — Advanced
    { id: "js-11", world: "javascript", tier: 3, tier_name: "Advanced", title: "Asynchronous JS (Callbacks, Promises, async/await)", description: "Manage asynchronous actions without freezing the browser thread.", order_index: 11, status: "locked", is_completed: false, boss_question: "Why do we use async and await instead of running synchronous code when loading data from a server?" },
    { id: "js-12", world: "javascript", tier: 3, tier_name: "Advanced", title: "Fetch API / Axios", description: "Request and receive data across the web using native fetch().", order_index: 12, status: "locked", is_completed: false, boss_question: "What does the fetch() function return, and why do you have to call response.json() before using the data?" },
    { id: "js-13", world: "javascript", tier: 3, tier_name: "Advanced", title: "Error Handling (try/catch)", description: "Safely catch runtime exceptions and prevent app crashes.", order_index: 13, status: "locked", is_completed: false, boss_question: "How does wrapping risky code in a try...catch block prevent an entire web application from crashing?" },
    { id: "js-14", world: "javascript", tier: 3, tier_name: "Advanced", title: "Closures & Scope", description: "Understand lexical scoping and how inner functions remember variables.", order_index: 14, status: "locked", is_completed: false, boss_question: "What is a closure in JavaScript, and how does an inner function retain access to variables from its outer function?" },
    { id: "js-15", world: "javascript", tier: 3, tier_name: "Advanced", title: "JSON Handling", description: "Serialize and parse data with JSON.stringify and JSON.parse.", order_index: 15, status: "locked", is_completed: false, boss_question: "What is the difference between JSON.stringify() and JSON.parse() when working with JavaScript objects?" },
    { id: "js-16", world: "javascript", tier: 3, tier_name: "Advanced", title: "Modules (import/export)", description: "Organize code into modular, reusable files with native ES modules.", order_index: 16, status: "locked", is_completed: false, boss_question: "What is the difference between a named export and a default export when using JavaScript ES modules?" }
  ]
};

// Storage key prefix for demo state persistence per world
const DEMO_STORAGE_PREFIX = "lorecraft_world_v3_";

/**
 * Retrieves the demo topics for a given world, reading from localStorage if modified.
 * @param {string} worldKey - The identifier of the world (e.g. 'python', 'javascript').
 * @returns {Array<object>} Array of topics for that world.
 */
function getDemoTopicsForWorld(worldKey) {
  const normalizedKey = (worldKey || "python").toLowerCase();
  const defaultList = SYLLABUS_DATA[normalizedKey] || SYLLABUS_DATA.python;

  if (typeof localStorage === "undefined") {
    return defaultList;
  }

  const storageKey = `${DEMO_STORAGE_PREFIX}${normalizedKey}`;
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === defaultList.length) {
        return parsed;
      }
    } catch {
      return defaultList;
    }
  }
  return defaultList;
}

/**
 * Saves modified demo topics for a world to localStorage.
 * @param {string} worldKey - World identifier.
 * @param {Array<object>} topics - Array of modified topics.
 */
function saveDemoTopicsForWorld(worldKey, topics) {
  if (typeof localStorage === "undefined") return;

  const normalizedKey = (worldKey || "python").toLowerCase();
  const storageKey = `${DEMO_STORAGE_PREFIX}${normalizedKey}`;
  localStorage.setItem(storageKey, JSON.stringify(topics));
}

/**
 * Returns the list of all available worlds/languages in the campaign.
 * @returns {Array<{id: string, name: string, icon: string, subtitle: string}>}
 */
export function getAvailableWorlds() {
  return WORLDS;
}

/**
 * Fetches campaign topics for a specific world, ordered by sequence.
 * Queries Supabase if credentials exist, otherwise returns demo data.
 * @param {string} [worldKey='python'] - The selected world.
 * @returns {Promise<Array<object>>} List of normalized topic objects.
 * @returns {Promise<Array<object>>} List of normalized topic objects.
 */
export async function fetchCampaignTopics(worldKey = "python") {
  const normalizedWorld = (worldKey || "python").toLowerCase();
  return getDemoTopicsForWorld(normalizedWorld);
}

/**
 * Finds a topic across all worlds by its unique topic ID.
 * @param {string|number} topicId - The unique topic identifier.
 * @returns {Promise<object|null>} The found topic object or null.
 */
export async function findTopicById(topicId) {
  for (const world of WORLDS) {
    const topics = getDemoTopicsForWorld(world.id);
    const match = topics.find((t) => String(t.id) === String(topicId));
    if (match) return match;
  }
  return null;
}

/**
 * Returns a structured lesson and 2 to 3 targeted trial questions for a given topic.
 * Teaches the learner the core concepts, key rules, and syntax before they face the trial questions.
 * @param {object} topic - The topic object from the syllabus.
 * @returns {{lesson: {summary: string, keyPoints: string[], codeExample: string}, questions: string[]}}
 */
export function getTopicLessonAndQuestions(topic) {
  if (topic.lesson && Array.isArray(topic.questions) && topic.questions.length >= 2) {
    return {
      lesson: topic.lesson,
      questions: topic.questions
    };
  }

  return getChamberLessonData(topic);
}

/**
 * Marks a campaign topic as completed in localStorage.
 * Enforces tier unlocking rules:
 * 1. Completing a topic unlocks the next sequential topic in the current tier.
 * 2. When all topics of Tier N are cleared, the first topic of Tier N+1 unlocks!
 * @param {string|number} topicId - The unique identifier of the topic.
 * @returns {Promise<boolean>} True if successfully updated.
 */
export async function markTopicCompleted(topicId) {
  const target = await findTopicById(topicId);
  if (!target) return false;

  const worldKey = target.world || "python";
  const list = getDemoTopicsForWorld(worldKey);
  const index = list.findIndex((t) => String(t.id) === String(topicId));

  if (index !== -1) {
    list[index].is_completed = true;
    list[index].status = "completed";

    const currentTier = list[index].tier;

    // Check if all topics in this current tier are now completed
    const tierTopics = list.filter((t) => t.tier === currentTier);
    const isTierComplete = tierTopics.every((t) => t.is_completed);

    if (isTierComplete) {
      // Unlock the very first topic of the next tier
      const nextTierFirstTopic = list.find((t) => t.tier === currentTier + 1);
      if (nextTierFirstTopic && nextTierFirstTopic.status === "locked") {
        nextTierFirstTopic.status = "unlocked";
      }
    } else {
      // Unlock the next sequential topic within the same tier
      if (index + 1 < list.length && list[index + 1].tier === currentTier) {
        if (list[index + 1].status === "locked") {
          list[index + 1].status = "unlocked";
        }
      }
    }

    saveDemoTopicsForWorld(worldKey, list);
  }
  return true;
}

/**
 * Resets all demo progress across all worlds or a specific world.
 * @param {string} [worldKey] - Optional specific world to reset.
 */
export function resetDemoProgress(worldKey) {
  if (worldKey) {
    localStorage.removeItem(`${DEMO_STORAGE_PREFIX}${worldKey.toLowerCase()}`);
  } else {
    for (const w of WORLDS) {
      localStorage.removeItem(`${DEMO_STORAGE_PREFIX}${w.id}`);
    }
  }
}
