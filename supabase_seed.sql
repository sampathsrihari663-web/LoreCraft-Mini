-- ============================================================================
-- LORECRAFT: MULTI-LANGUAGE CAMPAIGN SYLLABUS SEED SCRIPT
-- ============================================================================
-- Six Worlds (Python, C#, C++, HTML, CSS, JavaScript)
-- Three Tiers each (Tier 1: Foundations, Tier 2: Core, Tier 3: Advanced)
-- ============================================================================

-- 1. Create Topics Table (if not exists)
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,
  world TEXT NOT NULL,         -- 'python', 'csharp', 'cpp', 'html', 'css', 'javascript'
  tier INT NOT NULL,           -- 1: Foundations, 2: Core, 3: Advanced
  tier_name TEXT NOT NULL,     -- 'Foundations', 'Core', 'Advanced'
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'locked', -- 'unlocked', 'locked', 'completed'
  boss_question TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for speedy queries by world and tier
CREATE INDEX IF NOT EXISTS idx_topics_world_tier ON topics(world, tier, order_index);

-- Clear existing data if re-seeding
TRUNCATE TABLE topics;

-- 2. Insert Syllabus Topics

-- ============================================================================
-- WORLD 1: PYTHON
-- ============================================================================
-- Tier 1 — Foundations
INSERT INTO topics (id, world, tier, tier_name, title, description, order_index, status, boss_question, is_completed) VALUES
('py-1', 'python', 1, 'Foundations', 'Variables & Data Types', 'Learn how Python stores integers, floats, strings, and booleans.', 1, 'unlocked', 'How does Python determine the data type of a variable, and what is the difference between an integer and a float?', false),
('py-2', 'python', 1, 'Foundations', 'Operators & Expressions', 'Perform arithmetic, comparison, and boolean logic in Python.', 2, 'locked', 'What is the difference between the / operator and the // operator in Python?', false),
('py-3', 'python', 1, 'Foundations', 'Input / Output', 'Communicate with the user via print() and input().', 3, 'locked', 'What data type does the input() function return by default, and how do you convert it to a number?', false),
('py-4', 'python', 1, 'Foundations', 'Conditional Statements (if / elif / else)', 'Control execution flow using Python conditional branching.', 4, 'locked', 'How does Python use indentation to define blocks of code inside an if/elif/else statement?', false),
('py-5', 'python', 1, 'Foundations', 'Loops (for, while)', 'Iterate through sequences and repeat actions until conditions change.', 5, 'locked', 'When would you choose to use a for loop with range() instead of a while loop in Python?', false),

-- Tier 2 — Core
('py-6', 'python', 2, 'Core', 'Functions & Parameters', 'Define reusable procedures with def and return values.', 6, 'locked', 'How do default parameter values work in Python functions, and why must they come after non-default parameters?', false),
('py-7', 'python', 2, 'Core', 'Lists & Tuples', 'Store ordered collections and understand mutability vs immutability.', 7, 'locked', 'What is the primary difference between a Python list and a tuple, and when should you choose a tuple?', false),
('py-8', 'python', 2, 'Core', 'Dictionaries & Sets', 'Work with key-value pairs and unique collections of items.', 8, 'locked', 'How does a Python dictionary store data using key-value pairs, and why can sets not contain duplicate values?', false),
('py-9', 'python', 2, 'Core', 'String Manipulation', 'Format, slice, and transform text using Python string methods.', 9, 'locked', 'How does string slicing with [start:stop:step] work in Python?', false),
('py-10', 'python', 2, 'Core', 'File Handling', 'Open, read, write, and safely close files using context managers.', 10, 'locked', 'Why is it best practice to use the "with open(...)" statement when reading or writing files in Python?', false),
('py-11', 'python', 2, 'Core', 'Exception Handling', 'Catch and handle errors gracefully using try, except, and finally.', 11, 'locked', 'What is the purpose of the try-except block in Python, and when does the finally block execute?', false),

-- Tier 3 — Advanced
('py-12', 'python', 3, 'Advanced', 'OOP — Classes & Objects', 'Model entities with classes, attributes, and the __init__ constructor.', 12, 'locked', 'What is the purpose of the __init__ method in a Python class, and what does the "self" parameter represent?', false),
('py-13', 'python', 3, 'Advanced', 'OOP — Inheritance & Polymorphism', 'Derive child classes and override parent class behavior.', 13, 'locked', 'How does a child class inherit methods from a parent class in Python, and how do you call the parent method using super()?', false),
('py-14', 'python', 3, 'Advanced', 'Modules & Packages', 'Organize Python projects into modular files and import packages.', 14, 'locked', 'What is the difference between a Python module and a package, and what does __name__ == "__main__" do?', false),
('py-15', 'python', 3, 'Advanced', 'List/Dict Comprehensions', 'Write concise, expressive transformations for lists and dictionaries.', 15, 'locked', 'How does a list comprehension create a new list compared to a standard for loop, and how can you add a condition to it?', false),
('py-16', 'python', 3, 'Advanced', 'Decorators & Generators', 'Enhance functions with @decorators and yield values with generators.', 16, 'locked', 'What does the "yield" keyword do inside a Python generator function, and how does it save memory compared to returning a full list?', false);

-- ============================================================================
-- WORLD 2: C#
-- ============================================================================
-- Tier 1 — Foundations
INSERT INTO topics (id, world, tier, tier_name, title, description, order_index, status, boss_question, is_completed) VALUES
('cs-1', 'csharp', 1, 'Foundations', 'Variables & Data Types', 'Explore C# strongly typed values including int, double, string, and bool.', 1, 'unlocked', 'What does it mean that C# is a statically-typed language, and what is the difference between value types and reference types?', false),
('cs-2', 'csharp', 1, 'Foundations', 'Operators & Expressions', 'Use arithmetic, comparison, and compound operators.', 2, 'locked', 'How does the modulus operator (%) work in C#, and how can you use it to check if a number is even or odd?', false),
('cs-3', 'csharp', 1, 'Foundations', 'Console I/O', 'Read from and write to the terminal with Console.WriteLine and ReadLine.', 3, 'locked', 'Why must you use int.Parse() or Convert.ToInt32() when reading user input from Console.ReadLine() in C#?', false),
('cs-4', 'csharp', 1, 'Foundations', 'Conditional Statements', 'Make decisions with if, else if, else, and switch statements.', 4, 'locked', 'When is it cleaner to use a switch statement instead of multiple if-else if branches in C#?', false),
('cs-5', 'csharp', 1, 'Foundations', 'Loops', 'Repeat actions with for, while, and foreach loops.', 5, 'locked', 'How does a foreach loop differ from a standard for loop when iterating over an array in C#?', false),

-- Tier 2 — Core
('cs-6', 'csharp', 2, 'Core', 'Methods & Parameters', 'Encapsulate logic into methods with return types and parameters.', 6, 'locked', 'What does the "void" return type mean on a C# method, and what is the difference between passing by value versus using the "ref" keyword?', false),
('cs-7', 'csharp', 2, 'Core', 'Arrays & Collections (List)', 'Store elements in fixed-size arrays and dynamic List<T> collections.', 7, 'locked', 'What is the main advantage of using a List<T> over a standard fixed-size array in C#?', false),
('cs-8', 'csharp', 2, 'Core', 'Strings', 'Format strings using interpolation ($"...") and manipulate text.', 8, 'locked', 'Why are C# strings immutable, and how does string interpolation ($"Hello {name}") simplify string formatting?', false),
('cs-9', 'csharp', 2, 'Core', 'Exception Handling', 'Handle runtime errors cleanly with try, catch, and finally blocks.', 9, 'locked', 'Why should you catch specific exceptions (like FormatException) instead of only catching the general Exception class in C#?', false),
('cs-10', 'csharp', 2, 'Core', 'Structs vs Classes', 'Understand stack-allocated value types versus heap-allocated reference types.', 10, 'locked', 'What is the core difference between a struct (value type) and a class (reference type) in C# memory management?', false),

-- Tier 3 — Advanced
('cs-11', 'csharp', 3, 'Advanced', 'OOP — Classes, Inheritance, Interfaces', 'Build class hierarchies and implement interface contracts.', 11, 'locked', 'What is an interface in C#, and how does implementing an interface differ from inheriting a class?', false),
('cs-12', 'csharp', 3, 'Advanced', 'Properties & Encapsulation', 'Protect object state with getters, setters, and access modifiers.', 12, 'locked', 'Why do C# developers use properties with { get; set; } instead of making class fields public?', false),
('cs-13', 'csharp', 3, 'Advanced', 'Delegates & Events', 'Pass methods as parameters and notify subscribers of actions.', 13, 'locked', 'What is a delegate in C#, and how do events provide a safe way for objects to broadcast notifications?', false),
('cs-14', 'csharp', 3, 'Advanced', 'LINQ', 'Query collections using Language Integrated Query operations.', 14, 'locked', 'What do the LINQ methods .Where() and .Select() do when querying a collection of items in C#?', false),
('cs-15', 'csharp', 3, 'Advanced', 'Generics', 'Write type-safe, reusable algorithms with generic classes and methods.', 15, 'locked', 'Why are C# Generics (<T>) better for performance and safety than using general object types and casting?', false),
('cs-16', 'csharp', 3, 'Advanced', 'File I/O', 'Read, write, and append text files using File and StreamReader.', 16, 'locked', 'How does File.ReadAllText() simplify reading a file in C#, and why should stream resources be wrapped in a using statement?', false);

-- ============================================================================
-- WORLD 3: C++
-- ============================================================================
-- Tier 1 — Foundations
INSERT INTO topics (id, world, tier, tier_name, title, description, order_index, status, boss_question, is_completed) VALUES
('cpp-1', 'cpp', 1, 'Foundations', 'Variables & Data Types', 'Learn primitive types, sizes, and declarations in C++.', 1, 'unlocked', 'What is the difference between an int, a float, and a char in C++, and why does C++ require declaring types upfront?', false),
('cpp-2', 'cpp', 1, 'Foundations', 'Operators', 'Perform arithmetic, relational, and logical operations.', 2, 'locked', 'What is the difference between prefix increment (++x) and postfix increment (x++) in C++?', false),
('cpp-3', 'cpp', 1, 'Foundations', 'I/O (cin / cout)', 'Input and output with streams from the <iostream> header.', 3, 'locked', 'How do std::cin and std::cout use the stream operators >> and << to read and write data in C++?', false),
('cpp-4', 'cpp', 1, 'Foundations', 'Conditional Statements', 'Branch code using if, else if, else, and ternary operators.', 4, 'locked', 'How does the ternary conditional operator (condition ? expr1 : expr2) provide a shorthand for if-else in C++?', false),
('cpp-5', 'cpp', 1, 'Foundations', 'Loops', 'Master for, while, and do-while loops in C++.', 5, 'locked', 'What is the key difference between a while loop and a do-while loop in C++?', false),

-- Tier 2 — Core
('cpp-6', 'cpp', 2, 'Core', 'Functions & Function Overloading', 'Declare prototypes and write overloaded functions.', 6, 'locked', 'What is function overloading in C++, and how does the compiler know which overloaded version to call?', false),
('cpp-7', 'cpp', 2, 'Core', 'Arrays & Strings', 'Work with C-style arrays and the modern std::string class.', 7, 'locked', 'Why is std::string generally preferred over raw C-style null-terminated char arrays in modern C++?', false),
('cpp-8', 'cpp', 2, 'Core', 'Pointers & References', 'Understand memory addresses, dereferencing, and aliases.', 8, 'locked', 'What is the difference between a pointer (*) and a reference (&) in C++, and can a reference be reassigned?', false),
('cpp-9', 'cpp', 2, 'Core', 'Structures', 'Bundle related variables into custom composite data types.', 9, 'locked', 'How do you define a struct in C++, and how do you access its members using dot notation versus pointer arrow notation (->)?', false),
('cpp-10', 'cpp', 2, 'Core', 'Dynamic Memory (new / delete)', 'Allocate memory on the heap and prevent memory leaks.', 10, 'locked', 'What happens if memory allocated with "new" in C++ is never freed with "delete"? What is this issue called?', false),

-- Tier 3 — Advanced
('cpp-11', 'cpp', 3, 'Advanced', 'OOP — Constructors, Destructors, Inheritance', 'Build classes with lifecycle methods and derive subclasses.', 11, 'locked', 'When is a destructor called in C++, and why are destructors essential for cleaning up resources?', false),
('cpp-12', 'cpp', 3, 'Advanced', 'Polymorphism & Virtual Functions', 'Enable runtime dynamic dispatch with virtual methods.', 12, 'locked', 'What is the purpose of the "virtual" keyword in a C++ base class method, and what happens if it is omitted?', false),
('cpp-13', 'cpp', 3, 'Advanced', 'Templates', 'Write generic functions and classes that work with any type.', 13, 'locked', 'How does a template function (template <typename T>) allow you to write one function that works for ints, floats, and strings?', false),
('cpp-14', 'cpp', 3, 'Advanced', 'STL (vectors, maps, iterators)', 'Harness the Standard Template Library for fast data structures.', 14, 'locked', 'What is std::vector in C++, and why is vector::push_back() more flexible than a traditional fixed array?', false),
('cpp-15', 'cpp', 3, 'Advanced', 'Exception Handling', 'Throw, catch, and handle exceptions in C++.', 15, 'locked', 'How do the throw, try, and catch keywords work together to handle unexpected runtime errors in C++?', false),
('cpp-16', 'cpp', 3, 'Advanced', 'File Handling', 'Read and write disk files with ifstream and ofstream.', 16, 'locked', 'How do std::ifstream and std::ofstream open and close files for reading and writing in C++?', false);

-- ============================================================================
-- WORLD 4: HTML
-- ============================================================================
-- Tier 1 — Foundations
INSERT INTO topics (id, world, tier, tier_name, title, description, order_index, status, boss_question, is_completed) VALUES
('html-1', 'html', 1, 'Foundations', 'Document Structure & Tags', 'Understand the basic skeleton: <!DOCTYPE>, <html>, <head>, and <body>.', 1, 'unlocked', 'What is the purpose of the <!DOCTYPE html> declaration at the very top of an HTML document?', false),
('html-2', 'html', 1, 'Foundations', 'Headings & Text Formatting', 'Structure written content with <h1> to <h6>, <p>, and <strong>.', 2, 'locked', 'Why should a webpage generally only have one <h1> element, and how does heading hierarchy help accessibility?', false),
('html-3', 'html', 1, 'Foundations', 'Lists', 'Organize items using ordered (<ol>) and unordered (<ul>) lists.', 3, 'locked', 'What is the difference between an ordered list (<ol>) and an unordered list (<ul>) in HTML?', false),
('html-4', 'html', 1, 'Foundations', 'Links & Images', 'Connect pages with <a> anchors and embed images with <img>.', 4, 'locked', 'Why is the "alt" attribute on an <img> tag essential, and what does the "href" attribute do on an <a> tag?', false),
('html-5', 'html', 1, 'Foundations', 'Tables', 'Format tabular data using <table>, <tr>, <th>, and <td>.', 5, 'locked', 'What is the difference between a table header cell (<th>) and a regular table data cell (<td>) in HTML?', false),

-- Tier 2 — Core
('html-6', 'html', 2, 'Core', 'Forms & Input Elements', 'Collect user data with <form>, <input>, <select>, and <button>.', 6, 'locked', 'How does the "type" attribute on an <input> element change how it behaves (for example, text vs checkbox vs submit)?', false),
('html-7', 'html', 2, 'Core', 'Semantic HTML5 Elements', 'Use meaningful tags: <header>, <nav>, <main>, <article>, and <footer>.', 7, 'locked', 'Why is using semantic elements like <header>, <main>, and <nav> better than wrapping everything inside generic <div> tags?', false),
('html-8', 'html', 2, 'Core', 'Div/Span & Layout Structure', 'Understand block-level <div> vs inline <span> containers.', 8, 'locked', 'What is the difference between a block-level element like <div> and an inline element like <span>?', false),
('html-9', 'html', 2, 'Core', 'Multimedia (audio/video)', 'Embed sound and video natively using <audio> and <video>.', 9, 'locked', 'What does the "controls" attribute do when added to an HTML5 <video> tag?', false),
('html-10', 'html', 2, 'Core', 'Meta Tags & SEO Basics', 'Configure character sets, viewports, and search engine snippets.', 10, 'locked', 'Why is the <meta name="viewport" content="..."> tag essential for building mobile-friendly websites?', false),

-- Tier 3 — Advanced
('html-11', 'html', 3, 'Advanced', 'Accessibility (ARIA basics)', 'Make websites usable for screen readers with roles and aria attributes.', 11, 'locked', 'What is the purpose of ARIA attributes (like aria-label and role) in HTML, and when should they be used?', false),
('html-12', 'html', 3, 'Advanced', 'Form Validation Attributes', 'Validate forms natively with required, min, max, and pattern.', 12, 'locked', 'How does the HTML "required" attribute prevent a form from submitting invalid data without using JavaScript?', false),
('html-13', 'html', 3, 'Advanced', 'Embedding & iframes', 'Embed external pages and widgets securely using <iframe>.', 13, 'locked', 'What is an <iframe> used for in HTML, and why is the "sandbox" attribute recommended for security?', false),
('html-14', 'html', 3, 'Advanced', 'HTML5 APIs Overview (Canvas, LocalStorage)', 'Explore web graphics with <canvas> and client-side web storage.', 14, 'locked', 'What is the difference between drawing pixels on an HTML <canvas> and storing data in browser localStorage?', false);

-- ============================================================================
-- WORLD 5: CSS
-- ============================================================================
-- Tier 1 — Foundations
INSERT INTO topics (id, world, tier, tier_name, title, description, order_index, status, boss_question, is_completed) VALUES
('css-1', 'css', 1, 'Foundations', 'Selectors & Specificity', 'Target elements by tag, class, and ID, and resolve style conflicts.', 1, 'unlocked', 'Which selector has higher specificity in CSS: an ID selector (#hero) or a class selector (.hero), and why?', false),
('css-2', 'css', 1, 'Foundations', 'The Box Model', 'Master content, padding, border, and margin dimensions.', 2, 'locked', 'What are the four components of the CSS Box Model, and how does box-sizing: border-box affect element width?', false),
('css-3', 'css', 1, 'Foundations', 'Colors & Units', 'Use hex, rgb, rem, px, and viewport units (vh/vw).', 3, 'locked', 'What is the difference between pixels (px) and rem units in CSS, and why are rem units preferred for typography?', false),
('css-4', 'css', 1, 'Foundations', 'Typography', 'Style fonts, line-height, text alignment, and load web fonts.', 4, 'locked', 'How do font-family, font-size, and line-height work together to make text readable on a webpage?', false),
('css-5', 'css', 1, 'Foundations', 'Backgrounds & Borders', 'Apply colors, images, border-radius, and shadows.', 5, 'locked', 'How does border-radius round the corners of an element, and how do you make a square element completely circular?', false),

-- Tier 2 — Core
('css-6', 'css', 2, 'Core', 'Flexbox', 'Align and distribute items along a single axis with display: flex.', 6, 'locked', 'What is the difference between justify-content (main axis) and align-items (cross axis) in CSS Flexbox?', false),
('css-7', 'css', 2, 'Core', 'Grid Layout', 'Design two-dimensional layouts with grid-template-columns and gaps.', 7, 'locked', 'When would you choose CSS Grid over CSS Flexbox to lay out components on a page?', false),
('css-8', 'css', 2, 'Core', 'Positioning (relative / absolute / fixed)', 'Control element placement within the document flow.', 8, 'locked', 'What is the difference between position: relative, position: absolute, and position: fixed in CSS?', false),
('css-9', 'css', 2, 'Core', 'Responsive Design & Media Queries', 'Adapt designs across mobile, tablet, and desktop viewports.', 9, 'locked', 'How does a CSS @media query with (max-width: 768px) allow a website to change its layout on mobile phones?', false),
('css-10', 'css', 2, 'Core', 'Pseudo-classes & Pseudo-elements', 'Style hover states (:hover) and generate content (::before, ::after).', 10, 'locked', 'What is the difference between a pseudo-class like :hover and a pseudo-element like ::before in CSS?', false),

-- Tier 3 — Advanced
('css-11', 'css', 3, 'Advanced', 'CSS Variables (Custom Properties)', 'Declare and reuse tokens like --accent-color in :root.', 11, 'locked', 'Why are CSS Variables (--my-color) declared in :root, and how do you use the var() function to apply them?', false),
('css-12', 'css', 3, 'Advanced', 'Animations & Transitions', 'Smoothly animate property changes with transition and @keyframes.', 12, 'locked', 'What is the difference between a simple CSS transition and a multi-step @keyframes animation?', false),
('css-13', 'css', 3, 'Advanced', 'Transform', 'Rotate, scale, translate, and skew elements in 2D and 3D space.', 13, 'locked', 'Why is transform: translateY(-5px) better for animation performance than changing the top or margin property?', false),
('css-14', 'css', 3, 'Advanced', 'CSS Architecture Basics (BEM naming)', 'Structure scalable stylesheets using Block__Element--Modifier.', 14, 'locked', 'What do the Block, Element, and Modifier stand for in the BEM CSS naming convention, and why is it useful?', false);

-- ============================================================================
-- WORLD 6: JAVASCRIPT
-- ============================================================================
-- Tier 1 — Foundations
INSERT INTO topics (id, world, tier, tier_name, title, description, order_index, status, boss_question, is_completed) VALUES
('js-1', 'javascript', 1, 'Foundations', 'Variables (var / let / const)', 'Understand scoping and reassignability across variable keywords.', 1, 'unlocked', 'What is the difference between "let" and "const" in JavaScript, and why should you avoid using "var"?', false),
('js-2', 'javascript', 1, 'Foundations', 'Data Types & Operators', 'Master numbers, strings, booleans, null, undefined, and operators.', 2, 'locked', 'What is the difference between null and undefined in JavaScript?', false),
('js-3', 'javascript', 1, 'Foundations', 'Conditionals', 'Compare values and make decisions with if/else and strict equality (===).', 3, 'locked', 'What is the difference between == (loose equality) and === (strict equality) in JavaScript?', false),
('js-4', 'javascript', 1, 'Foundations', 'Loops', 'Repeat actions with for, while, and for...of loops.', 4, 'locked', 'How does a for...of loop simplify iterating over the elements of an array compared to a traditional for loop?', false),
('js-5', 'javascript', 1, 'Foundations', 'Functions', 'Write reusable functions, pass parameters, and return values.', 5, 'locked', 'What is the difference between a function parameter and an argument in JavaScript?', false),

-- Tier 2 — Core
('js-6', 'javascript', 2, 'Core', 'Arrays & Array Methods', 'Manipulate lists using map, filter, forEach, and reduce.', 6, 'locked', 'What is the difference between the .map() method and the .filter() method on a JavaScript array?', false),
('js-7', 'javascript', 2, 'Core', 'Objects', 'Model data with key-value pairs and access properties.', 7, 'locked', 'When must you access an object property using bracket notation obj[key] instead of dot notation obj.key?', false),
('js-8', 'javascript', 2, 'Core', 'DOM Manipulation', 'Select elements and modify text, attributes, and styles dynamically.', 8, 'locked', 'How do you select an element with document.querySelector() and change its text content in JavaScript?', false),
('js-9', 'javascript', 2, 'Core', 'Events', 'Listen and respond to user clicks, keypresses, and submissions.', 9, 'locked', 'Why is element.addEventListener("click", fn) preferred over inline HTML onclick attributes?', false),
('js-10', 'javascript', 2, 'Core', 'ES6+ Syntax (arrow functions, template literals, destructuring)', 'Write modern, expressive JavaScript with ES6 features.', 10, 'locked', 'How does object destructuring (const { name, age } = user) simplify extracting values from an object?', false),

-- Tier 3 — Advanced
('js-11', 'javascript', 3, 'Advanced', 'Asynchronous JS (Callbacks, Promises, async/await)', 'Manage asynchronous actions without freezing the browser thread.', 11, 'locked', 'Why do we use async and await instead of running synchronous code when loading data from a server?', false),
('js-12', 'javascript', 3, 'Advanced', 'Fetch API / Axios', 'Request and receive data across the web using native fetch().', 12, 'locked', 'What does the fetch() function return, and why do you have to call response.json() before using the data?', false),
('js-13', 'javascript', 3, 'Advanced', 'Error Handling (try/catch)', 'Safely catch runtime exceptions and prevent app crashes.', 13, 'locked', 'How does wrapping risky code in a try...catch block prevent an entire web application from crashing?', false),
('js-14', 'javascript', 3, 'Advanced', 'Closures & Scope', 'Understand lexical scoping and how inner functions remember variables.', 14, 'locked', 'What is a closure in JavaScript, and how does an inner function retain access to variables from its outer function?', false),
('js-15', 'javascript', 3, 'Advanced', 'JSON Handling', 'Serialize and parse data with JSON.stringify and JSON.parse.', 15, 'locked', 'What is the difference between JSON.stringify() and JSON.parse() when working with JavaScript objects?', false),
('js-16', 'javascript', 3, 'Advanced', 'Modules (import/export)', 'Organize code into modular, reusable files with native ES modules.', 16, 'locked', 'What is the difference between a named export and a default export when using JavaScript ES modules?', false);

-- ============================================================================
-- END OF SEED SCRIPT
-- ============================================================================
