/**
 * File: js/service/lessons/cppLessons.js
 * Comprehensive teaching scrolls and targeted trial questions for World 3: C++.
 */

export const CPP_LESSONS = {
  "cpp-1": {
    title: "Variables & Data Types",
    summary: [
      "C++ is a high-performance, statically-typed, compiled systems programming language created by Bjarne Stroustrup.",
      "C++ requires declaring variable data types upfront so the compiler knows the exact number of bytes to allocate in memory and can optimize CPU register usage.",
      "Primitive types include: int (typically 4 bytes for whole numbers), float (4-byte single-precision decimal), double (8-byte high-precision decimal), char (1 byte for ASCII characters), and bool (1 byte for true/false flags)."
    ],
    keyPoints: [
      "Static Typing: Explicit declaration required (int score = 0;). Modern C++ also supports compile-time inference with 'auto'.",
      "Memory Sizes: int (4 bytes), double (8 bytes), char (1 byte). Sizes can be verified with sizeof(type).",
      "Constants: Use 'const' or 'constexpr' (evaluated at compile time) for immutable values.",
      "Initialization: Modern C++ prefers brace initialization: int health{100}; to prevent narrowing conversions."
    ],
    codeExample: `#include <iostream>

int main() {
    int heroLevel = 12;            // 4-byte integer
    double manaPoints = 145.75;    // 8-byte high-precision decimal
    char runeSymbol = 'A';         // 1-byte character (single quotes)
    bool isPoisoned = false;       // 1-byte boolean

    std::cout << "Hero Level: " << heroLevel << "\\n";
    std::cout << "Size of double: " << sizeof(manaPoints) << " bytes\\n";
    return 0;
}`,
    questions: [
      "What is the difference between an int, a float, and a char in C++, and why does C++ require declaring types upfront?",
      "What does the sizeof() operator do in C++?",
      "What is the difference between a float and a double in C++ precision and memory?"
    ]
  },

  "cpp-2": {
    title: "Operators",
    summary: [
      "C++ provides a full suite of arithmetic (+, -, *, /, %), comparison (==, !=, <, >, <=, >=), and logical (&&, ||, !) operators.",
      "Increment operators exist in two forms: Prefix (++x) and Postfix (x++). The prefix operator increments the variable FIRST and returns the new value. The postfix operator returns the current value to the surrounding expression FIRST, and increments the variable afterward.",
      "Integer division truncates decimals (7 / 2 is 3). To retain decimal fractions, cast one operand (e.g. static_cast<double>(7) / 2 is 3.5)."
    ],
    keyPoints: [
      "Prefix vs Postfix: ++x increments before evaluation; x++ increments after evaluation.",
      "Integer Truncation: Dividing two integers discards the remainder (5 / 2 = 2).",
      "Compound Operators: +=, -=, *=, /= provide concise updates (x += 5)."
    ],
    codeExample: `#include <iostream>

int main() {
    int a = 5;
    int b = ++a; // Prefix: 'a' becomes 6, then 'b' receives 6
    std::cout << "a: " << a << ", b: " << b << "\\n"; // 6, 6

    int x = 5;
    int y = x++; // Postfix: 'y' receives 5, then 'x' becomes 6
    std::cout << "x: " << x << ", y: " << y << "\\n"; // 6, 5
    return 0;
}`,
    questions: [
      "What is the difference between prefix increment (++x) and postfix increment (x++) in C++?",
      "What does the expression 9 / 2 evaluate to in C++, and why?",
      "What does the compound operator x += 10 do in C++?"
    ]
  },

  "cpp-3": {
    title: "I/O (cin / cout)",
    summary: [
      "Terminal I/O in C++ is managed through streams provided by the standard <iostream> header.",
      "std::cout represents standard output and uses the insertion operator (<<) to stream text and variables to the screen. std::endl flushes the buffer and inserts a newline.",
      "std::cin represents standard input and uses the extraction operator (>>) to extract typed data into variables. For reading full lines containing spaces, use std::getline(std::cin, my_string)."
    ],
    keyPoints: [
      "Insertion Operator (<<): Points toward cout (std::cout << text).",
      "Extraction Operator (>>): Points toward variable (std::cin >> variable).",
      "Buffer Flush: std::endl flushes the stream; '\\n' is faster when immediate flushing is not required."
    ],
    codeExample: `#include <iostream>
#include <string>

int main() {
    std::cout << "Enter hero name: ";
    std::string name;
    std::cin >> name; // Reads until whitespace

    std::cout << "Enter starting gold: ";
    int gold;
    std::cin >> gold;

    std::cout << "Welcome, " << name << "! Gold: " << gold << "\\n";
    return 0;
}`,
    questions: [
      "How do std::cin and std::cout use the stream operators >> and << to read and write data in C++?",
      "Why does std::cin >> text stop reading when it encounters a space, and what should you use to read a whole line of text?",
      "What is the performance difference between std::endl and '\\n' in C++?"
    ]
  },

  "cpp-4": {
    title: "Conditional Statements",
    summary: [
      "Execution flow in C++ is branched using if, else if, else, switch, and the ternary conditional operator.",
      "The ternary operator (condition ? expr1 : expr2) evaluates a boolean condition: if true, it returns expr1; if false, it returns expr2. It allows one-line conditional assignments.",
      "A switch statement evaluates an integral or enum expression against 'case' constants and requires 'break' to prevent fallthrough to subsequent cases."
    ],
    keyPoints: [
      "If-Else Structure: Enclosed in parentheses: if (health <= 0) { ... }.",
      "Ternary Operator: 'int max = (a > b) ? a : b;' simplifies inline assignments.",
      "Switch Fallthrough: Forgetting 'break;' causes execution to bleed into subsequent cases."
    ],
    codeExample: `#include <iostream>

int main() {
    int health = 75;

    // Ternary operator for concise evaluation
    std::string status = (health > 50) ? "Vigorous" : "Wounded";
    std::cout << "Hero Status: " << status << "\\n";

    // Switch statement
    char direction = 'N';
    switch (direction) {
        case 'N': std::cout << "Heading North\\n"; break;
        case 'S': std::cout << "Heading South\\n"; break;
        default:  std::cout << "Unknown Direction\\n"; break;
    }
    return 0;
}`,
    questions: [
      "How does the ternary conditional operator (condition ? expr1 : expr2) provide a shorthand for if-else in C++?",
      "What happens if you omit the 'break' statement inside a C++ switch case?",
      "Can you use floating-point numbers (floats) in a C++ switch statement?"
    ]
  },

  "cpp-5": {
    title: "Loops",
    summary: [
      "C++ features for, while, do-while, and modern range-based for loops.",
      "The while loop evaluates its condition at the TOP before executing; if false initially, the loop body never runs. The do-while loop evaluates its condition at the BOTTOM, guaranteeing that the body executes at least once.",
      "Modern C++ supports range-based for loops: 'for (const auto& item : collection)' which cleanly iterate over arrays and vectors."
    ],
    keyPoints: [
      "While vs Do-While: while tests first; do-while executes at least once before testing.",
      "Standard For Loop: for (int i = 0; i < n; i++) gives index access.",
      "Range-based For: for (auto item : container) simplifies reading all elements safely."
    ],
    codeExample: `#include <iostream>

int main() {
    // 1. Do-while guarantees at least one execution
    int attempts = 0;
    do {
        std::cout << "Attempting dungeon lockpick...\\n";
        attempts++;
    } while (attempts < 1);

    // 2. Range-based for loop
    int potions[] = { 10, 25, 50 };
    for (int p : potions) {
        std::cout << "Potion potency: " << p << " HP\\n";
    }
    return 0;
}`,
    questions: [
      "What is the key difference between a while loop and a do-while loop in C++?",
      "How does a modern range-based for loop (for (auto x : arr)) work in C++?",
      "What do 'break' and 'continue' do when used inside a C++ loop?"
    ]
  },

  "cpp-6": {
    title: "Functions & Function Overloading",
    summary: [
      "Functions in C++ break programs into modular, reusable procedures. Functions must be declared (via forward declaration or prototype) before they are called.",
      "Function Overloading allows multiple functions in the same scope to share the EXACT SAME name, as long as their parameter lists differ in type, count, or order.",
      "The C++ compiler matches the arguments passed at the call site to the correct overloaded signature at compile time."
    ],
    keyPoints: [
      "Function Prototypes: Informs compiler of function signature before its full definition.",
      "Overloading Criteria: Parameter count, types, or order must differ. Overloading solely by return type is invalid.",
      "Pass by Reference: Passing with '&' (e.g. void heal(int& hp)) avoids copying large objects and allows in-place changes."
    ],
    codeExample: `#include <iostream>

// Overloaded functions sharing the same name 'damage'
void damage(int amount) {
    std::cout << "Dealt " << amount << " physical damage!\\n";
}

void damage(int amount, std::string element) {
    std::cout << "Dealt " << amount << " " << element << " elemental damage!\\n";
}

int main() {
    damage(25);                  // Calls 1st version
    damage(40, "Fire");          // Calls 2nd version
    return 0;
}`,
    questions: [
      "What is function overloading in C++, and how does the compiler know which overloaded version to call?",
      "Can two overloaded functions differ only by their return type in C++?",
      "What is a function prototype in C++, and why is it used?"
    ]
  },

  "cpp-7": {
    title: "Arrays & Strings",
    summary: [
      "C++ supports both raw C-style arrays/strings and modern C++ standard library structures (std::array, std::string).",
      "Raw C-style strings are arrays of chars terminated by a null character ('\\0'). They are dangerous because they lack bounds checking and are prone to buffer overflows.",
      "Modern C++ strongly recommends std::string (from <string>), which dynamically manages its own memory, prevents overflows, and provides intuitive operators (+, ==, <) and methods (.length(), .substr())."
    ],
    keyPoints: [
      "Null Terminator: C-strings end in '\\0' (e.g. char text[] = \"Hi\"; takes 3 bytes: 'H', 'i', '\\0').",
      "std::string Benefits: Automatic memory management, bounds-safe resizing, and built-in helper methods.",
      "Zero-indexed: Elements accessed using square brackets (arr[0])."
    ],
    codeExample: `#include <iostream>
#include <string>

int main() {
    // Modern std::string
    std::string spell = "Fireball";
    spell += " Surge"; // String concatenation with +

    std::cout << "Spell: " << spell << "\\n";
    std::cout << "Length: " << spell.length() << " characters\\n";

    // Fixed array
    int stats[3] = { 100, 50, 75 };
    std::cout << "Base HP: " << stats[0] << "\\n";
    return 0;
}`,
    questions: [
      "Why is std::string generally preferred over raw C-style null-terminated char arrays in modern C++?",
      "What is a null terminator ('\\0') in a C-style string, and what happens if it is missing?",
      "How do you check the length of an std::string in C++?"
    ]
  },

  "cpp-8": {
    title: "Pointers & References",
    summary: [
      "Pointers and references are fundamental C++ mechanics for direct memory access and efficient parameter passing.",
      "A Pointer (*) is a variable that holds the memory address of another variable. Pointers can be null (nullptr) and reassigned to point to different memory locations. The address-of operator (&) gets an address; the dereference operator (*) accesses the value stored at that address.",
      "A Reference (&) is an alias for an existing variable. References must be initialized upon declaration and CANNOT be reassigned to refer to another object. References act like syntactic sugar for pointers that cannot be null."
    ],
    keyPoints: [
      "Address-of (&): Returns memory address (&x).",
      "Dereference (*): Accesses the value stored at the pointer address (*ptr).",
      "Pointer vs Reference: Pointers can be null and reassigned; references cannot be null and cannot be rebound.",
      "nullptr: Always initialize unused pointers to nullptr to avoid dangling pointer bugs."
    ],
    codeExample: `#include <iostream>

int main() {
    int gold = 100;

    // 1. Pointer holding memory address
    int* ptr = &gold;
    std::cout << "Address: " << ptr << " | Value: " << *ptr << "\\n";
    *ptr = 150; // Modify original variable through pointer dereference!

    // 2. Reference acting as an alias
    int& ref = gold;
    ref = 200;  // Modifies 'gold' directly

    std::cout << "Updated Gold: " << gold << "\\n"; // 200
    return 0;
}`,
    questions: [
      "What is the difference between a pointer (*) and a reference (&) in C++, and can a reference be reassigned?",
      "What does the dereference operator (*) do when used on a pointer variable in C++?",
      "What is a nullptr in modern C++, and why should you use it instead of NULL or 0?"
    ]
  },

  "cpp-9": {
    title: "Structures",
    summary: [
      "A struct (structure) in C++ allows you to group related variables of different types into a custom composite data type.",
      "In C++, structs and classes are nearly identical with ONE KEY DIFFERENCE: members of a struct are PUBLIC by default, whereas members of a class are PRIVATE by default.",
      "To access members of a struct object directly, use dot notation (item.value). To access members through a POINTER to a struct, use the arrow operator (ptr->value)."
    ],
    keyPoints: [
      "Struct Declaration: struct Player { std::string name; int hp; }; (don't forget the trailing semicolon!).",
      "Default Public: All struct members are public unless explicitly marked private.",
      "Dot vs Arrow: Use '.' on direct objects (p.hp); use '->' on object pointers (ptr->hp)."
    ],
    codeExample: `#include <iostream>
#include <string>

struct Artifact {
    std::string name;
    int powerLevel;
    int durability;
};

int main() {
    Artifact sword = { "Excalibur", 99, 100 };
    std::cout << "Weapon: " << sword.name << " (Power: " << sword.powerLevel << ")\\n";

    // Accessing via pointer using arrow operator (->)
    Artifact* ptr = &sword;
    ptr->durability -= 10;
    std::cout << "Durability: " << ptr->durability << "\\n"; // 90
    return 0;
}`,
    questions: [
      "How do you define a struct in C++, and how do you access its members using dot notation versus pointer arrow notation (->)?",
      "What is the only default difference between a struct and a class in C++?",
      "Why must you place a semicolon (;) at the end of a struct definition in C++?"
    ]
  },

  "cpp-10": {
    title: "Dynamic Memory (new / delete)",
    summary: [
      "Dynamic memory allows your program to request heap memory at runtime whose size doesn't need to be known at compile time.",
      "In C++, you allocate heap memory using the 'new' keyword (e.g. int* p = new int(42);) and release it using the 'delete' keyword (delete p;). For arrays, allocate with 'new[]' and free with 'delete[]'.",
      "CRITICAL DANGER: If allocated heap memory is not freed with delete, it causes a MEMORY LEAK. Memory leaks consume system RAM and can cause system freezes and crashes."
    ],
    keyPoints: [
      "Heap Allocation: 'new Type' allocates memory on heap and returns its pointer address.",
      "Deallocation: 'delete ptr' frees single object; 'delete[] arr' frees dynamically allocated arrays.",
      "Memory Leak: Failure to delete allocated heap memory results in unreleased RAM.",
      "Dangling Pointer: After deleting a pointer, assign it to nullptr (ptr = nullptr;) to prevent accessing freed memory."
    ],
    codeExample: `#include <iostream>

int main() {
    // Allocate single integer on heap
    int* pScore = new int(100);
    std::cout << "Dynamic Score: " << *pScore << "\\n";

    // Free heap memory (Crucial!)
    delete pScore;
    pScore = nullptr; // Prevent dangling pointer

    // Dynamic array allocation
    int* pArray = new int[3]{ 10, 20, 30 };
    delete[] pArray;  // Free array with delete[]
    pArray = nullptr;
    return 0;
}`,
    questions: [
      "What happens if memory allocated with 'new' in C++ is never freed with 'delete'? What is this issue called?",
      "What is the difference between 'delete' and 'delete[]' in C++?",
      "What is a dangling pointer, and how does setting a pointer to nullptr after deletion help prevent bugs?"
    ]
  },

  "cpp-11": {
    title: "OOP — Constructors, Destructors, Inheritance",
    summary: [
      "C++ is an object-oriented language supporting constructors, destructors, and class inheritance.",
      "A Constructor initializes new class objects. A Destructor (prefixed with a tilde ~) is called automatically when an object goes out of scope or is deleted.",
      "Destructors are the foundation of RAII (Resource Acquisition Is Initialization) in C++: any resource allocated in the constructor (like heap memory or open files) is guaranteed to be cleaned up automatically in the destructor."
    ],
    keyPoints: [
      "Constructor: Matches class name with no return type; initializes member variables.",
      "Destructor (~ClassName): Automatically cleans up unmanaged resources upon object destruction.",
      "Inheritance: class Warrior : public Character inherits public/protected members of Character.",
      "RAII: Tie resource lifespan to object lifespan to prevent resource leaks automatically."
    ],
    codeExample: `#include <iostream>
#include <string>

class Spellbook {
private:
    std::string title;
public:
    // Constructor
    Spellbook(std::string t) : title(t) {
        std::cout << "Spellbook '" << title << "' opened.\\n";
    }

    // Destructor (automatically called when object leaves scope)
    ~Spellbook() {
        std::cout << "Spellbook '" << title << "' safely closed and sealed.\\n";
    }
};

int main() {
    {
        Spellbook book("Pyromancy Secrets");
    } // book goes out of scope here -> destructor runs automatically!
    std::cout << "Exited inner scope.\\n";
    return 0;
}`,
    questions: [
      "When is a destructor called in C++, and why are destructors essential for cleaning up resources?",
      "What does the RAII (Resource Acquisition Is Initialization) pattern mean in C++?",
      "What is the syntax for a class constructor and a destructor in C++?"
    ]
  },

  "cpp-12": {
    title: "Polymorphism & Virtual Functions",
    summary: [
      "Polymorphism allows derived classes to override base class methods and be invoked uniformly through base class pointers or references.",
      "In C++, dynamic polymorphism REQUIRES the 'virtual' keyword on base class methods. The 'virtual' keyword instructs the compiler to generate a Virtual Method Table (vtable), enabling dynamic runtime dispatch.",
      "If 'virtual' is omitted, the compiler binds calls statically at compile time based on the pointer type rather than the actual object instance, calling the base version instead of the derived version."
    ],
    keyPoints: [
      "virtual Keyword: Enables runtime dynamic dispatch through base pointers/references.",
      "override Specifier: Modern C++ keyword ensuring the method properly overrides a base virtual method.",
      "Virtual Destructor: Always make base class destructors virtual (virtual ~Base() = default;) to ensure derived destructors run properly."
    ],
    codeExample: `#include <iostream>

class Monster {
public:
    // Virtual method enables dynamic runtime dispatch!
    virtual void Roar() {
        std::cout << "Generic beast growl.\\n";
    }
    virtual ~Monster() = default; // Virtual destructor
};

class Dragon : public Monster {
public:
    void Roar() override { // Overrides base method
        std::cout << "Draconic roar shaking the heavens with dragonfire!\\n";
    }
};

int main() {
    Monster* enemy = new Dragon();
    enemy->Roar(); // Calls Dragon::Roar() thanks to 'virtual'!
    delete enemy;
    return 0;
}`,
    questions: [
      "What is the purpose of the 'virtual' keyword in a C++ base class method, and what happens if it is omitted?",
      "What does the 'override' keyword do in modern C++?",
      "Why should a base class with virtual functions always have a virtual destructor?"
    ]
  },

  "cpp-13": {
    title: "Templates",
    summary: [
      "Templates are C++'s mechanism for generic programming, allowing functions and classes to operate with generic types without duplicating code.",
      "You declare a template function using 'template <typename T>'. During compilation, whenever you call the function with a specific type (like int or double), the compiler generates a specialized version of the code for that type.",
      "Because template instantiation happens entirely at compile time, templates incur ZERO runtime performance overhead."
    ],
    keyPoints: [
      "Template Declaration: 'template <typename T>' introduces placeholder type T.",
      "Compile-Time Instantiation: The compiler creates concrete functions for each distinct type used.",
      "Zero Runtime Cost: Generic code is as fast as hand-written concrete functions.",
      "Header Implementation: Template definitions must typically reside in header files so compilers can inspect their source."
    ],
    codeExample: `#include <iostream>

// Generic template function
template <typename T>
T GetMax(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << "Max Int: " << GetMax(10, 25) << "\\n";         // Calls GetMax<int>
    std::cout << "Max Float: " << GetMax(4.5, 2.1) << "\\n";     // Calls GetMax<double>
    std::cout << "Max Char: " << GetMax('A', 'Z') << "\\n";      // Calls GetMax<char>
    return 0;
}`,
    questions: [
      "How does a template function (template <typename T>) allow you to write one function that works for ints, floats, and strings?",
      "When does template code generation happen in C++: at compile time or at runtime?",
      "Why must template function implementations usually be kept in header files (.h) rather than .cpp files?"
    ]
  },

  "cpp-14": {
    title: "STL (vectors, maps, iterators)",
    summary: [
      "The Standard Template Library (STL) is a rich collection of generic container classes, algorithms, and iterators in C++.",
      "std::vector (from <vector>) is a dynamically resizable array stored in contiguous memory. Using vector.push_back() appends items and automatically expands capacity when full.",
      "std::map (from <map>) stores key-value pairs sorted by key using red-black trees, while std::unordered_map provides hash table lookup. Iterators act as generalized pointers to traverse STL containers."
    ],
    keyPoints: [
      "std::vector<T>: Preferred dynamic array with fast contiguous random access and automatic resizing.",
      "std::map<K, V>: Ordered key-value pairs with O(log N) lookup.",
      "Iterators: Traverse containers (for (auto it = v.begin(); it != v.end(); ++it))."
    ],
    codeExample: `#include <iostream>
#include <vector>
#include <map>

int main() {
    // 1. std::vector
    std::vector<std::string> dungeonLoot;
    dungeonLoot.push_back("Gold Ring");
    dungeonLoot.push_back("Health Potion");
    std::cout << "Loot count: " << dungeonLoot.size() << "\\n";

    // 2. std::map
    std::map<std::string, int> playerStats;
    playerStats["Attack"] = 85;
    playerStats["Defense"] = 60;
    std::cout << "Attack power: " << playerStats["Attack"] << "\\n";
    return 0;
}`,
    questions: [
      "What is std::vector in C++, and why is vector::push_back() more flexible than a traditional fixed array?",
      "What is the difference between std::map and std::unordered_map in C++?",
      "What is an iterator in C++ STL, and what do .begin() and .end() return?"
    ]
  },

  "cpp-15": {
    title: "Exception Handling",
    summary: [
      "Exception handling in C++ separates error detection from error resolution using 'throw', 'try', and 'catch'.",
      "When an error occurs, code 'throws' an exception object (often derived from std::exception). The runtime halts normal execution, unwinds the call stack (calling destructors for local objects along the way), and jumps to the matching 'catch' block.",
      "Stack unwinding ensures that local objects are properly cleaned up even when errors interrupt function flow."
    ],
    keyPoints: [
      "throw: Signals an exception (throw std::runtime_error(\"Out of mana!\");).",
      "try-catch: try monitors code; catch catches the exception reference (catch (const std::exception& e)).",
      "Stack Unwinding: Destructors of all stack objects are executed as the stack unwinds to the catch handler."
    ],
    codeExample: `#include <iostream>
#include <stdexcept>

void CastSpell(int manaCost, int currentMana) {
    if (manaCost > currentMana) {
        throw std::runtime_error("Insufficient mana to cast spell!");
    }
    std::cout << "Spell cast successfully!\\n";
}

int main() {
    try {
        CastSpell(50, 20); // Will throw!
    } catch (const std::runtime_error& ex) {
        std::cout << "Caught Exception: " << ex.what() << "\\n";
    }
    return 0;
}`,
    questions: [
      "How do the throw, try, and catch keywords work together to handle unexpected runtime errors in C++?",
      "What is stack unwinding during a C++ exception, and what happens to local objects?",
      "What does the .what() method do on a std::exception object?"
    ]
  },

  "cpp-16": {
    title: "File Handling",
    summary: [
      "File I/O in C++ is managed through streams in the <fstream> library: std::ifstream (input file stream) for reading, and std::ofstream (output file stream) for writing.",
      "std::ofstream creates or opens a file for writing using the insertion operator (<<). std::ifstream reads data using >> or std::getline().",
      "Because fstream classes follow RAII, both ifstream and ofstream automatically close their files when their stream objects go out of scope, preventing file leaks."
    ],
    keyPoints: [
      "std::ofstream: Output file stream for writing/creating files.",
      "std::ifstream: Input file stream for reading files.",
      "Automatic Closure: Streams close automatically via destructors when exiting scope.",
      "File Checking: Always check if the file opened successfully using if (file.is_open())."
    ],
    codeExample: `#include <iostream>
#include <fstream>
#include <string>

int main() {
    // 1. Writing to a file
    std::ofstream outFile("chronicles.txt");
    if (outFile.is_open()) {
        outFile << "Day 1: Discovered the ancient dragon shrine.\\n";
        outFile << "Day 2: Forged the flame sword.\\n";
        outFile.close(); // Optional, destructor will close automatically
    }

    // 2. Reading line-by-line
    std::ifstream inFile("chronicles.txt");
    std::string line;
    while (std::getline(inFile, line)) {
        std::cout << "CHRONICLE: " << line << "\\n";
    }
    return 0;
}`,
    questions: [
      "How do std::ifstream and std::ofstream open and close files for reading and writing in C++?",
      "Why is checking file.is_open() important before reading or writing to a file in C++?",
      "How does std::getline(inFile, line) read an entire line from a file in C++?"
    ]
  }
};
