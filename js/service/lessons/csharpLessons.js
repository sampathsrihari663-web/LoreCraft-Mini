/**
 * File: js/service/lessons/csharpLessons.js
 * Comprehensive teaching scrolls and targeted trial questions for World 2: C#.
 */

export const CSHARP_LESSONS = {
  "cs-1": {
    title: "Variables & Data Types",
    summary: [
      "C# is a modern, object-oriented, statically-typed language developed by Microsoft for the .NET platform.",
      "Statically-typed means that every variable's type (such as int, double, string, or bool) must be known at compile time, allowing the compiler to detect type mismatch errors before your program ever runs.",
      "Types are categorized into Value Types and Reference Types. Value types (like int, float, bool, structs) store their actual data directly on the stack memory. Reference types (like string, object, classes) store a reference (pointer) to data residing on the heap memory."
    ],
    keyPoints: [
      "Static Typing: Variables require explicit types or type inference using 'var' (where the compiler infers the fixed type at compile-time).",
      "Value Types (Stack): 'int' (32-bit integer), 'double' (64-bit floating point), 'bool' (true/false), 'char' (single character).",
      "Reference Types (Heap): 'string', arrays, and classes store memory addresses pointing to heap objects.",
      "Const Qualifier: Use the 'const' keyword to declare immutable constants whose values cannot change."
    ],
    codeExample: `// 1. Value Types (stored on the Stack)
int playerLevel = 10;
double manaRegenRate = 3.75;
bool isShieldActive = true;

// 2. Reference Types (stored on the Heap)
string heroTitle = "Archmage of Avalon";

// 3. Compile-time type inference with 'var'
var experiencePoints = 2500; // Inferred as 'int' by the C# compiler
Console.WriteLine($"Hero: {heroTitle} | Level: {playerLevel}");`,
    questions: [
      "What does it mean that C# is a statically-typed language?",
      "What is the difference between a value type (stack) and a reference type (heap) in C#?",
      "How does the 'var' keyword work in C#, and does it make C# dynamically typed?"
    ]
  },

  "cs-2": {
    title: "Operators & Expressions",
    summary: [
      "Operators in C# allow you to perform arithmetic (+, -, *, /, %), comparison (==, !=, <, >, <=, >=), and logical (&&, ||, !) operations.",
      "Integer division in C# truncates fractions (e.g. 7 / 2 evaluates to 3). To obtain a decimal result, at least one operand must be a floating-point type (e.g. 7.0 / 2 evaluates to 3.5).",
      "The modulus operator (%) calculates the remainder after integer division. For example, 10 % 3 evaluates to 1, and (number % 2 == 0) checks if a number is even."
    ],
    keyPoints: [
      "Integer Division Truncation: Dividing two ints drops decimals (7 / 2 is 3). Cast to double for decimals ( (double)7 / 2 is 3.5 ).",
      "Modulus (%): Returns division remainder. Often used for even/odd testing or circular array indexing.",
      "Short-circuit Logic: Logical AND (&&) and OR (||) evaluate from left to right and skip right-side evaluation if the result is already determined."
    ],
    codeExample: `int totalItems = 7;
int groupSize = 2;

// Integer division vs Modulus
int groups = totalItems / groupSize;     // 3 (integer division drops .5)
int leftover = totalItems % groupSize;   // 1 (remainder)

// Decimal division with casting
double exact = (double)totalItems / groupSize; // 3.5

bool isEven = (totalItems % 2 == 0);     // false`,
    questions: [
      "What happens when you divide two integers in C# (e.g. 7 / 2), and how do you get a decimal result?",
      "How does the modulus operator (%) work in C#, and how can it check if a number is even or odd?",
      "What is short-circuit evaluation in C# logical operators (&& and ||)?"
    ]
  },

  "cs-3": {
    title: "Console I/O",
    summary: [
      "The Console class in the System namespace handles terminal input and output in C#.",
      "You output text using Console.WriteLine() (which appends a newline) or Console.Write() (which does not). Modern C# uses string interpolation with the dollar sign ($) to embed variables directly: $\"Level: {level}\".",
      "User input is read via Console.ReadLine(), which ALWAYS returns a string. To convert text input to a numeric integer, you must parse it using int.Parse() or safely using int.TryParse()."
    ],
    keyPoints: [
      "Console Output: Console.WriteLine($\"Hello {userName}\") prints formatted text with a newline.",
      "Input is String: Console.ReadLine() always returns a string, requiring parsing for numeric operations.",
      "Parsing: Use int.Parse(str) or the safer int.TryParse(str, out int val) which prevents FormatException crashes on invalid text."
    ],
    codeExample: `Console.Write("Enter your hero's name: ");
string name = Console.ReadLine();

Console.Write("Enter your starting health: ");
string rawHealth = Console.ReadLine();

// Parsing string into an integer
if (int.TryParse(rawHealth, out int health)) {
    Console.WriteLine($"Welcome, {name}! Health initialized to {health}.");
} else {
    Console.WriteLine("Invalid number entered! Defaulting health to 100.");
}`,
    questions: [
      "Why must you use int.Parse() or int.TryParse() when reading numbers from Console.ReadLine() in C#?",
      "What is the difference between Console.Write() and Console.WriteLine()?",
      "How does string interpolation ($\"...\") work in C#?"
    ]
  },

  "cs-4": {
    title: "Conditional Statements",
    summary: [
      "Conditional statements control execution paths using if, else if, else, and switch statements.",
      "An if-else structure tests boolean conditions sequentially. When checking a single variable against multiple fixed values (like numbers, strings, or enums), a 'switch' statement is cleaner and easier to maintain than chaining many if-else if statements.",
      "Modern C# also supports 'switch expressions' with the fat arrow (=>) syntax for concise value mapping."
    ],
    keyPoints: [
      "If / Else If: Evaluates conditional boolean expressions. Blocks are enclosed in curly braces { }.",
      "Switch Statement: Matches discrete values using 'case' labels and must end each branch with 'break;'.",
      "Default Case: The 'default:' branch runs when no matching case is found.",
      "Ternary Operator: 'condition ? trueVal : falseVal' provides a one-line shorthand for simple assignments."
    ],
    codeExample: `int playerRank = 2;
string rankTitle;

// Traditional switch statement
switch (playerRank) {
    case 1:
        rankTitle = "Apprentice";
        break;
    case 2:
        rankTitle = "Journeyman";
        break;
    case 3:
        rankTitle = "Grandmaster";
        break;
    default:
        rankTitle = "Novice";
        break;
}

Console.WriteLine($"Rank Title: {rankTitle}");`,
    questions: [
      "When is it cleaner to use a switch statement instead of multiple if-else if branches in C#?",
      "What is the purpose of the 'break' statement inside each switch case in C#?",
      "What does the 'default' case do in a C# switch statement?"
    ]
  },

  "cs-5": {
    title: "Loops",
    summary: [
      "C# provides four primary loops for repeating actions: for, while, do-while, and foreach.",
      "The 'foreach' loop is a standout feature of C#: it automatically iterates through every element in an array or collection (implementing IEnumerable) without needing manual index variables, preventing off-by-one errors.",
      "A standard 'for' loop uses an index counter (int i = 0; i < len; i++) and is preferred when you need the index position or need to modify elements in-place."
    ],
    keyPoints: [
      "Foreach Loop: 'foreach (var item in collection)' safely reads all elements without indexing.",
      "For Loop: 'for (int i = 0; i < n; i++)' gives numeric index access.",
      "While vs Do-While: 'while' checks condition before running; 'do-while' runs at least once before checking.",
      "Loop Jump Statements: 'break' exits immediately; 'continue' skips to next iteration."
    ],
    codeExample: `string[] equipment = { "Iron Helm", "Steel Breastplate", "Warhammer" };

// 1. Foreach loop (cleanest for reading collections)
Console.WriteLine("Equipped Items:");
foreach (string item in equipment) {
    Console.WriteLine($"- {item}");
}

// 2. Standard for loop (when index number is needed)
for (int i = 0; i < equipment.Length; i++) {
    Console.WriteLine($"Slot #{i + 1}: {equipment[i]}");
}`,
    questions: [
      "How does a foreach loop differ from a standard for loop when iterating over an array in C#?",
      "What is the key difference between a while loop and a do-while loop in C#?",
      "Can you modify elements of an array inside a foreach loop in C#?"
    ]
  },

  "cs-6": {
    title: "Methods & Parameters",
    summary: [
      "Methods encapsulate reusable procedural logic within a class or struct. In C#, every method must declare an access modifier (public, private), a return type, and parameter list.",
      "The 'void' keyword indicates that a method performs an action but returns no value to the caller.",
      "By default, arguments are passed BY VALUE (a copy is passed). Using the 'ref' keyword passes by reference, allowing modifications to affect the caller's variable. The 'out' keyword is used to return multiple values from a method."
    ],
    keyPoints: [
      "Return Types: Must specify the return type (int, string, bool) or 'void' if nothing is returned.",
      "Pass by Value: The default behavior; changes made inside the method do not affect the original variable.",
      "ref vs out: 'ref' requires the variable to be initialized before passing; 'out' must be assigned inside the method before exiting."
    ],
    codeExample: `class Spellcaster {
    // Standard method returning an integer
    public int CalculateHeal(int baseHeal, int bonus) {
        return baseHeal + bonus;
    }

    // Method using 'ref' to modify caller's health directly
    public void ApplyDamage(ref int currentHealth, int damage) {
        currentHealth -= damage;
    }
}

// Calling the methods:
int health = 100;
Spellcaster cleric = new Spellcaster();
cleric.ApplyDamage(ref health, 25);
Console.WriteLine($"Remaining Health: {health}"); // Output: 75`,
    questions: [
      "What does the 'void' return type mean on a C# method?",
      "What is the difference between passing an argument by value versus using the 'ref' keyword in C#?",
      "How does the 'out' parameter keyword work, and how does it differ from 'ref'?"
    ]
  },

  "cs-7": {
    title: "Arrays & Collections (List)",
    summary: [
      "In C#, an Array (e.g. int[]) is a fixed-size collection whose capacity cannot change once allocated.",
      "A List<T> (from System.Collections.Generic) is a dynamically resizable generic collection. It automatically allocates more memory and expands as you add items with .Add() or remove items with .Remove().",
      "Because List<T> is generic (using <T>), it provides complete compile-time type safety and prevents performance-costly boxing/unboxing."
    ],
    keyPoints: [
      "Fixed Array: 'int[] arr = new int[5];' has an immutable length fixed at creation.",
      "Dynamic List: 'List<string> items = new List<string>();' resizes automatically on .Add().",
      "Type Safety: List<T> enforces that only objects of type T can be added, catching type errors at compile-time."
    ],
    codeExample: `// Fixed array (size 3)
string[] fixedBag = new string[3] { "Potion", "Map", "Compass" };

// Dynamic List<T> (resizes dynamically)
List<string> dynamicInventory = new List<string>();
dynamicInventory.Add("Elixir of Life");
dynamicInventory.Add("Dragon Scale");
dynamicInventory.Remove("Dragon Scale");

Console.WriteLine($"Items count: {dynamicInventory.Count}"); // 1`,
    questions: [
      "What is the main advantage of using a List<T> over a standard fixed-size array in C#?",
      "How do you add and remove items from a List<T> in C#?",
      "What does the property .Length on an array and .Count on a List<T> represent?"
    ]
  },

  "cs-8": {
    title: "Strings",
    summary: [
      "Strings in C# are sequences of Unicode characters that represent text. In C#, strings are immutable objects residing in heap memory.",
      "Immutability means once a string object is created, it cannot be modified. Any operation that appears to modify a string (like .ToUpper() or concatenation) actually allocates a brand new string in memory.",
      "String interpolation ($\"...\") is the standard, clean way to format strings by embedding expressions directly inside curly braces."
    ],
    keyPoints: [
      "Immutability: Modifying strings creates new instances in memory. For heavy string concatenation in loops, use StringBuilder.",
      "String Interpolation: Prefix with $ to embed variables: $\"Score: {score}\".",
      "Verbatim Strings: Prefix with @ to ignore escape characters and preserve newlines: @\"C:\\Folder\\File.txt\"."
    ],
    codeExample: `string hero = "Gwen";
int damage = 42;

// String interpolation ($"...")
string message = $"Champion {hero} dealt {damage} critical damage!";

// Immutability: .ToUpper() returns a new string
string upperMessage = message.ToUpper();

// Verbatim string (@"...") for paths
string savePath = @"C:\\Games\\LoreCraft\\Save.dat";
Console.WriteLine(message);`,
    questions: [
      "Why are C# strings immutable, and what happens in memory when you modify a string?",
      "How does string interpolation with $\"Hello {name}\" simplify text formatting in C#?",
      "When should you use StringBuilder instead of regular string concatenation (+) in C#?"
    ]
  },

  "cs-9": {
    title: "Exception Handling",
    summary: [
      "Exceptions represent unexpected errors that occur during program execution (such as dividing by zero, failing to find a file, or parsing invalid text).",
      "C# uses try, catch, and finally blocks to handle exceptions gracefully. Code that may fail is wrapped in the 'try' block, and specific errors are caught in 'catch' blocks.",
      "BEST PRACTICE: Always catch specific exceptions (like FormatException or FileNotFoundException) rather than catching the generic System.Exception, which can mask critical programming bugs."
    ],
    keyPoints: [
      "Try-Catch: 'try { ... } catch (FormatException ex) { ... }' prevents app crashes.",
      "Finally Block: Guarantees execution for resource cleanup, regardless of whether an exception occurred.",
      "Catch Specificity: Order catch blocks from most specific exception to most general."
    ],
    codeExample: `try {
    Console.Write("Enter your age: ");
    int age = int.Parse(Console.ReadLine()); // May throw FormatException!
    Console.WriteLine($"Age verified: {age}");
} catch (FormatException ex) {
    Console.WriteLine($"Input Error: Please enter digits only. Details: {ex.Message}");
} catch (OverflowException) {
    Console.WriteLine("Input Error: Number is too large or small for an integer!");
} finally {
    Console.WriteLine("Age verification procedure completed.");
}`,
    questions: [
      "Why should you catch specific exceptions (like FormatException) instead of only catching the general Exception class in C#?",
      "When is the 'finally' block executed in a C# try-catch structure?",
      "What is the difference between throwing an exception with 'throw;' vs 'throw ex;' in C#?"
    ]
  },

  "cs-10": {
    title: "Structs vs Classes",
    summary: [
      "C# provides two ways to define custom composite data structures: 'class' and 'struct'.",
      "The fundamental difference is MEMORY ALLOCATION: A Struct is a Value Type allocated directly on the stack and copied by value. A Class is a Reference Type allocated on the heap whose memory is managed by the Garbage Collector.",
      "Use structs for small, lightweight, immutable data structures (like 2D/3D coordinate Points, Colors, or Vectors). Use classes for complex business logic, entities with state, and hierarchies requiring inheritance."
    ],
    keyPoints: [
      "Struct = Value Type: Lives on the stack, copied by value when assigned or passed to methods.",
      "Class = Reference Type: Lives on the heap, variable holds a pointer to object memory.",
      "Inheritance: Structs cannot inherit from other structs or classes; classes support single inheritance.",
      "Garbage Collection: Structs don't create GC overhead; classes require garbage collection cleanup."
    ],
    codeExample: `// Struct: Lightweight value type on Stack
public struct Point2D {
    public int X;
    public int Y;
    public Point2D(int x, int y) { X = x; Y = y; }
}

// Class: Heavyweight reference type on Heap
public class Monster {
    public string Name;
    public int Health;
    public Monster(string name, int hp) { Name = name; Health = hp; }
}

// Struct assignment copies the entire value:
Point2D p1 = new Point2D(10, 20);
Point2D p2 = p1; // p2 is an independent copy!
p2.X = 99;
Console.WriteLine(p1.X); // Still 10!`,
    questions: [
      "What is the core difference between a struct (value type) and a class (reference type) in C# memory management?",
      "When should you choose to create a struct instead of a class in C#?",
      "What happens when you assign one struct variable to another struct variable?"
    ]
  },

  "cs-11": {
    title: "OOP — Classes, Inheritance, Interfaces",
    summary: [
      "C# is an object-oriented language supporting classes, inheritance, and interface contracts.",
      "Inheritance: A class can inherit members from a single base class using the colon syntax: class Mage : Hero. C# does not support multiple class inheritance.",
      "Interfaces: An interface defines a contract of method and property signatures without implementation. Unlike classes, a C# class can implement MULTIPLE interfaces (e.g. class Player : Entity, IDamageable, IMovable), enabling flexible polymorphism."
    ],
    keyPoints: [
      "Single Class Inheritance: A class can only inherit from one base class.",
      "Multiple Interfaces: A class can implement any number of interfaces (prefixed with 'I', like IDisposable).",
      "Virtual & Override: Base class methods must be marked 'virtual' to allow derived classes to 'override' them."
    ],
    codeExample: `// Interface contract
public interface IDamageable {
    void TakeDamage(int amount);
}

// Base Class
public class Hero {
    public string Name { get; set; }
    public Hero(string name) { Name = name; }
    public virtual void Speak() => Console.WriteLine($"{Name} greets you.");
}

// Child Class inheriting Base and implementing Interface
public class Paladin : Hero, IDamageable {
    public int Armor { get; set; } = 50;

    public Paladin(string name) : base(name) { }

    public void TakeDamage(int amount) {
        Armor -= amount;
        Console.WriteLine($"{Name}'s armor reduced to {Armor}!");
    }
}`,
    questions: [
      "What is an interface in C#, and how does implementing an interface differ from inheriting a class?",
      "How many base classes can a C# class inherit from, and how many interfaces can it implement?",
      "What is the purpose of the 'virtual' and 'override' keywords in C# method inheritance?"
    ]
  },

  "cs-12": {
    title: "Properties & Encapsulation",
    summary: [
      "Encapsulation is the OOP principle of hiding internal object state and requiring interaction through controlled methods or properties.",
      "In C#, Properties combine the simplicity of public fields with the security of getter and setter methods. The syntax 'public int Health { get; private set; }' allows anyone to read Health, but only the class itself to modify it.",
      "Using properties allows developers to add validation rules (e.g. checking that age > 0) without breaking external code that uses the property."
    ],
    keyPoints: [
      "Auto-Implemented Properties: 'public int Score { get; set; }' lets compiler generate backing field.",
      "Encapsulation Control: Restrict access with 'private set' or 'init' (set only during initialization).",
      "Full Properties: Use explicit backing fields to add validation logic inside 'get' and 'set' accessors."
    ],
    codeExample: `public class Character {
    private int _health = 100; // Backing field

    // Encapsulated property with validation
    public int Health {
        get => _health;
        set {
            if (value < 0) _health = 0;
            else if (value > 100) _health = 100;
            else _health = value;
        }
    }

    // Auto-property with private setter
    public string Name { get; private set; }

    public Character(string name) { Name = name; }
}`,
    questions: [
      "Why do C# developers use properties with { get; set; } instead of making class fields public?",
      "What does 'private set' do on a C# property?",
      "How do properties support the OOP principle of encapsulation?"
    ]
  },

  "cs-13": {
    title: "Delegates & Events",
    summary: [
      "Delegates and events provide a publish-subscribe architecture in C# for decoupled communication between objects.",
      "A Delegate is a type-safe function pointer that can hold references to methods with a matching signature.",
      "An Event wraps a delegate to provide safety: external classes can subscribe (+=) or unsubscribe (-=) listeners, but ONLY the class that declared the event can trigger/invoke it. This prevents external code from wiping out other subscribers."
    ],
    keyPoints: [
      "Delegate: Type-safe reference to one or more methods (MulticastDelegate).",
      "Event: Protects delegates by restricting invocation strictly to the declaring class.",
      "Built-in Delegates: C# provides 'Action' (methods with no return) and 'Func' (methods with a return value)."
    ],
    codeExample: `public class BossEnemy {
    // Event declaration using Action delegate
    public event Action OnBossDefeated;

    public void Defeat() {
        Console.WriteLine("Boss has fallen!");
        // Safely trigger event if any subscribers exist
        OnBossDefeated?.Invoke();
    }
}

// Subscribing to the event:
BossEnemy dragon = new BossEnemy();
dragon.OnBossDefeated += () => Console.WriteLine("Quest Complete! Chest unlocked.");
dragon.Defeat();`,
    questions: [
      "What is a delegate in C#, and how do events provide a safe way for objects to broadcast notifications?",
      "What is the difference between an Action delegate and a Func delegate in C#?",
      "Why can external classes only use += and -= on an event, but cannot invoke it directly?"
    ]
  },

  "cs-14": {
    title: "LINQ",
    summary: [
      "LINQ (Language Integrated Query) is a set of features in C# that brings SQL-like querying capabilities directly into the C# language for collections, XML, and databases.",
      "LINQ methods operate on any collection implementing IEnumerable<T>. The most common methods are .Where() (filters elements based on a condition) and .Select() (transforms/projects elements into a new shape).",
      "LINQ uses DEFERRED EXECUTION: a query is not actually executed when it is defined; it executes only when iterated over (e.g. in a foreach loop or by calling .ToList())."
    ],
    keyPoints: [
      ".Where(predicate): Filters items that satisfy a boolean condition.",
      ".Select(transform): Projects each item into a transformed value or new type.",
      ".OrderBy(key): Sorts elements in ascending order.",
      "Deferred Execution: Queries execute when enumerated, saving CPU cycles until results are actually needed."
    ],
    codeExample: `using System.Linq;

List<int> scores = new List<int> { 85, 42, 95, 60, 78, 99 };

// Query: Find high scores (>= 75) and sort them descending
var topScores = scores
    .Where(s => s >= 75)
    .OrderByDescending(s => s)
    .ToList(); // Executes query!

Console.WriteLine("Top Scores: " + string.Join(", ", topScores));
// Output: 99, 95, 85, 78`,
    questions: [
      "What do the LINQ methods .Where() and .Select() do when querying a collection in C#?",
      "What does 'deferred execution' mean in LINQ, and when does a query actually execute?",
      "How do you convert a LINQ query result immediately into a concrete List?"
    ]
  },

  "cs-15": {
    title: "Generics",
    summary: [
      "Generics allow you to write classes, interfaces, and methods that work with any data type while maintaining complete compile-time type safety.",
      "Before generics, collections stored raw 'object' references, requiring runtime casting and causing boxing/unboxing performance penalties for value types.",
      "With Generics, you declare a type parameter placeholder <T> (e.g. class Chest<T>). When instantiated (Chest<GoldCoin>), T is substituted with the concrete type, guaranteeing safety without runtime overhead."
    ],
    keyPoints: [
      "Type Placeholder <T>: Allows code to work with multiple types without duplicate classes.",
      "Compile-Time Safety: Prevents InvalidCastException by verifying types during compilation.",
      "No Boxing/Unboxing: Stores value types directly without converting them to heap objects.",
      "Constraints: Use 'where T : class' or 'where T : new()' to restrict what types can be used."
    ],
    codeExample: `// Generic container class with placeholder <T>
public class Vault<T> {
    private T _item;

    public void Store(T item) { _item = item; }
    public T Retrieve() { return _item; }
}

// Instantiating with specific types:
Vault<int> goldVault = new Vault<int>();
goldVault.Store(500); // Only integers allowed!

Vault<string> secretVault = new Vault<string>();
secretVault.Store("Ancient Spell Scroll"); // Only strings allowed!`,
    questions: [
      "Why are C# Generics (<T>) better for performance and safety than using general 'object' types and casting?",
      "What is boxing and unboxing, and how do generics eliminate it for value types?",
      "How do generic type constraints (using the 'where' keyword) work in C#?"
    ]
  },

  "cs-16": {
    title: "File I/O",
    summary: [
      "File I/O in C# is handled by classes in the System.IO namespace (such as File, Directory, Path, and StreamReader).",
      "For quick operations, the static File class provides one-liner methods: File.ReadAllText(path), File.WriteAllText(path, text), and File.AppendAllText(path, text).",
      "For streams (FileStream, StreamReader), resources must be wrapped in a 'using' statement. The using statement guarantees that Dispose() and Close() are called deterministically when exiting the block, releasing unmanaged file locks."
    ],
    keyPoints: [
      "File Helper Class: Quick operations like File.WriteAllText() and File.ReadAllLines().",
      "The 'using' Statement: Guarantees resource disposal (IDisposable.Dispose) even during crashes.",
      "Path.Combine: Always use Path.Combine(dir, file) to build cross-platform safe file paths."
    ],
    codeExample: `using System.IO;

string filePath = "savegame.txt";

// 1. Quick write with static File helper
File.WriteAllText(filePath, "Level: 15\\nClass: Paladin\\nGold: 1200");

// 2. Reading safely with a StreamReader and using statement
using (StreamReader reader = new StreamReader(filePath)) {
    string line;
    while ((line = reader.ReadLine()) != null) {
        Console.WriteLine($"READ: {line}");
    }
} // reader is automatically closed and disposed here!`,
    questions: [
      "How does File.ReadAllText() simplify reading a file in C#?",
      "Why should stream resources (like StreamReader or FileStream) always be wrapped in a 'using' statement in C#?",
      "Why is Path.Combine() preferred over manual string concatenation when building file paths?"
    ]
  }
};
