/**
 * File: js/service/lessons/pythonLessons.js
 * Comprehensive teaching scrolls and targeted trial questions for World 1: Python.
 * Each lesson provides:
 *  - summary: Array of explanatory paragraphs teaching the concept from scratch.
 *  - keyPoints: Concrete rules, syntax rules, and core distinctions.
 *  - codeExample: Practical, commented, functional code snippet.
 *  - questions: 2 to 3 targeted trial questions directly tested by the lesson.
 */

export const PYTHON_LESSONS = {
  "py-1": {
    title: "Variables & Data Types",
    summary: [
      "A variable is a named storage container in your computer's memory used to hold information that your program can reference and manipulate.",
      "Python is a dynamically-typed language. Unlike languages like C++ or Java where you must declare 'int x = 5', Python infers the type automatically at runtime the moment you assign a value with the equals sign (=).",
      "The four foundational primitive types in Python are: int (whole numbers like 10 or -3), float (decimal numbers like 3.14), str (text wrapped in single or double quotes), and bool (logical True or False)."
    ],
    keyPoints: [
      "Dynamic Typing: Variables are created automatically upon assignment (e.g., score = 100). No type keywords (int/str) are needed.",
      "Integers vs. Floats: 'int' represents whole numbers without decimals; 'float' represents real numbers with a fractional decimal point.",
      "Strings & Booleans: Strings must be enclosed in quotes ('hello' or \"hello\"). Booleans must be capitalized (True or False).",
      "Type Inspection: You can verify the data type of any variable using Python's built-in type() function."
    ],
    codeExample: `# 1. Storing numbers (integers and floats)
player_level = 5           # int (whole number)
walk_speed = 4.5           # float (decimal point)

# 2. Text and truth flags
hero_name = "Eldrin"       # str (enclosed in quotes)
is_alive = True            # bool (capitalized True or False)

# 3. Dynamic reassignment and checking types
mana = 50                  # Initially an integer
print(type(hero_name))     # Output: <class 'str'>
print(type(walk_speed))    # Output: <class 'float'>`,
    questions: [
      "In your own words, what is a variable, and how do you assign the integer 50 to a variable named 'mana' in Python?",
      "How does Python determine the data type of a variable, and what is the difference between an integer (int) and a float?",
      "Why don't you have to write a type keyword (like 'int' or 'string') when declaring a variable in Python?"
    ]
  },

  "py-2": {
    title: "Operators & Expressions",
    summary: [
      "Operators are special symbols that perform computations on values and variables. Python supports arithmetic (+, -, *, /, //, %, **), comparison (==, !=, <, >, <=, >=), and logical operators (and, or, not).",
      "A crucial distinction in Python is between standard division (/) and floor division (//). Standard division (/) ALWAYS returns a floating-point number (e.g., 7 / 2 evaluates to 3.5). Floor division (//) divides and rounds down to the nearest integer, discarding any fractional remainder (so 7 // 2 evaluates to 3).",
      "The modulus operator (%) calculates the remainder after division, which is widely used to check if numbers are even or odd."
    ],
    keyPoints: [
      "Standard Division (/): Always returns a float, even for even division (e.g. 4 / 2 is 2.0).",
      "Floor Division (//): Divides and rounds down to the nearest whole integer (e.g. 7 // 2 is 3).",
      "Modulus (%): Returns the division remainder (e.g. 10 % 3 is 1; number % 2 == 0 checks for even numbers).",
      "Exponentiation (**): Calculates power expressions (e.g. 2 ** 3 is 8)."
    ],
    codeExample: `# 1. Division variations
exact_result = 7 / 2     # Returns 3.5 (float)
floor_result = 7 // 2    # Returns 3 (int, rounds down)

# 2. Modulus (remainder)
remainder = 7 % 2        # Returns 1 (because 7 = 3 * 2 + 1)
is_even = (8 % 2 == 0)   # Returns True

# 3. Powers and Logical Operators
power = 2 ** 4           # 2 to the 4th power = 16
has_stamina = True
can_sprint = (power > 10) and has_stamina  # True`,
    questions: [
      "What is the difference between standard division (/) and floor division (//) in Python?",
      "What does the modulus operator (%) do, and what does 10 % 3 evaluate to?",
      "How do you calculate powers or exponents in Python (e.g. 2 to the power of 4)?"
    ]
  },

  "py-3": {
    title: "Input / Output",
    summary: [
      "Input and Output (I/O) allow your Python programs to communicate with the user. Output is displayed in the terminal using print(), while user input is captured using input().",
      "CRITICAL RULE: The input() function ALWAYS captures and returns user keystrokes as a text string (str), even if the user typed numbers like '42'.",
      "To perform calculations with user input, you must explicitly convert (typecast) the string into a numeric type using int(user_input) for whole numbers or float(user_input) for decimals."
    ],
    keyPoints: [
      "Printing: Use print() to display messages. Use formatted f-strings (f\"Hello {name}\") to cleanly embed variables.",
      "Input String Default: input('Prompt: ') pauses execution and returns user text as a string (str).",
      "Type Conversion: Convert input strings with int() or float() before doing math, otherwise '5' + '5' concatenates into '55'.",
      "Multiple Arguments: print() accepts multiple arguments separated by commas (e.g. print('Score:', score))."
    ],
    codeExample: `# 1. Output with modern f-strings
hero_name = "Aria"
print(f"Welcome to the quest, {hero_name}!")

# 2. Reading user input (always a string!)
raw_gold = input("Enter gold found: ") # e.g. User types: 25

# 3. Typecasting string to integer for arithmetic
coins = int(raw_gold)                  # Converts "25" to 25
total_gold = coins + 50                # Safe arithmetic!
print(f"Total treasury: {total_gold} gold coins.")`,
    questions: [
      "What data type does the input() function return by default in Python?",
      "If a user enters '20' into an input prompt, how do you convert it into an integer to use in math?",
      "What is an f-string in Python, and how do you use it inside print() to display a variable?"
    ]
  },

  "py-4": {
    title: "Conditional Statements (if / elif / else)",
    summary: [
      "Conditional statements allow your program to make decisions and execute different blocks of code depending on whether conditions evaluate to True or False.",
      "Unlike many languages that use curly braces { }, Python uses whitespace indentation (standard 4 spaces) to define code blocks. A colon (:) marks the end of the condition line, and all indented lines beneath it belong to that branch.",
      "You evaluate conditions sequentially using 'if', optional 'elif' (else-if) branches, and an optional fallback 'else' branch that runs if none of the previous conditions were met."
    ],
    keyPoints: [
      "Indentation Matters: Blocks of code are defined strictly by uniform whitespace indentation following a colon (:).",
      "Branching Hierarchy: 'if' checks the primary condition; 'elif' checks subsequent conditions; 'else' catches remaining cases.",
      "Comparison Operators: Use == for equality (never single = which is for assignment), != for not equal, <, >, <=, >=.",
      "Boolean Logic: Combine multiple conditions using 'and', 'or', and negate with 'not'."
    ],
    codeExample: `player_health = 45

# Branching execution based on health condition
if player_health <= 0:
    print("Defeated! Revive at the nearest shrine.")
elif player_health < 50:
    print("Warning: Health is low! Drink a potion.")
else:
    print("Health is strong! Onward into battle!")`,
    questions: [
      "How does Python use indentation and colons (:) to define blocks of code in an if/elif/else statement?",
      "What is the difference between = (single equals) and == (double equals) in Python?",
      "When does the 'else' block execute in an if/elif/else structure?"
    ]
  },

  "py-5": {
    title: "Loops (for, while)",
    summary: [
      "Loops allow you to repeat a block of code multiple times without rewriting it. Python provides two primary loop types: 'for' loops and 'while' loops.",
      "A 'for' loop is used when iterating through a known sequence or range of numbers (e.g. for i in range(5)). It executes a predetermined number of times.",
      "A 'while' loop is condition-driven: it continues repeating as long as its boolean condition remains True. It is ideal when you don't know in advance how many iterations will be needed (e.g. waiting for valid user input)."
    ],
    keyPoints: [
      "For Loop with range(): range(start, stop, step) generates numbers up to but not including the stop index.",
      "While Loop: Repeats as long as its condition is True. Ensure the condition eventually changes to avoid infinite loops.",
      "Loop Controls: 'break' terminates the loop immediately; 'continue' skips the rest of the current iteration."
    ],
    codeExample: `# 1. For loop over a range (repeats 3 times: 0, 1, 2)
for round_num in range(1, 4):
    print(f"Boss Battle Round {round_num}!")

# 2. While loop repeating until condition changes
mana = 30
while mana > 0:
    print(f"Casting spell! Remaining mana: {mana}")
    mana -= 10  # Decrement to prevent an infinite loop!

print("Out of mana!")`,
    questions: [
      "When would you choose to use a for loop with range() instead of a while loop in Python?",
      "What does the 'break' statement do when placed inside a loop?",
      "What causes an infinite while loop, and how do you prevent one from occurring?"
    ]
  },

  "py-6": {
    title: "Functions & Parameters",
    summary: [
      "A function is a named, reusable block of code designed to perform a specific task. You define functions in Python using the 'def' keyword followed by parentheses and a colon (:).",
      "Functions can accept input variables called parameters, and return calculated results back to the caller using the 'return' statement.",
      "Python supports default parameter values (e.g. def heal(amount=20)). Default parameters must always be placed after non-default parameters to prevent ambiguity when calling the function."
    ],
    keyPoints: [
      "Definition & Call: Define with 'def func_name(params):'. Call with 'func_name(args)'.",
      "Return Values: The 'return' statement sends a result back to the caller and terminates function execution.",
      "Default Parameters: Provide fallback values (e.g., greeting=\"Hello\"). Must follow positional parameters.",
      "Scope: Variables created inside a function are local to that function and cannot be accessed outside."
    ],
    codeExample: `# Function with a required parameter and a default parameter
def calculate_damage(base_attack, multiplier=1.5):
    total = base_attack * multiplier
    return total  # Return result to the caller

# Calling with default multiplier (1.5)
hit_one = calculate_damage(20)         # 20 * 1.5 = 30.0
# Calling with custom multiplier (2.0)
hit_two = calculate_damage(20, 2.0)    # 20 * 2.0 = 40.0

print(f"Strike 1: {hit_one} dmg | Strike 2: {hit_two} dmg")`,
    questions: [
      "What is the purpose of the 'return' statement inside a Python function?",
      "How do default parameter values work, and why must they come after non-default parameters?",
      "What is the difference between a parameter and an argument in Python?"
    ]
  },

  "py-7": {
    title: "Lists & Tuples",
    summary: [
      "Lists and tuples are ordered collections used to store multiple items in a single variable.",
      "The critical distinction between them is MUTABILITY: Lists (declared with square brackets []) are mutable, meaning you can add, remove, and modify items in-place. Tuples (declared with parentheses ()) are immutable, meaning once created, their elements cannot be changed.",
      "Use tuples for fixed, read-only data (like coordinate pairs (x, y) or constant records), and lists when data needs to grow or change dynamically."
    ],
    keyPoints: [
      "Lists are Mutable: Created with []. Can append with .append(), remove with .remove(), or modify by index.",
      "Tuples are Immutable: Created with (). Cannot be changed after creation, offering memory efficiency and write protection.",
      "Zero-indexed: Both lists and tuples are indexed starting at 0 (my_list[0] accesses the first item).",
      "Negative Indexing: my_list[-1] accesses the last element in the collection."
    ],
    codeExample: `# 1. Mutable List (can change)
inventory = ["sword", "shield", "potion"]
inventory.append("magic ring")  # Add item
inventory[0] = "flaming sword" # Modify in-place
print(inventory)               # ['flaming sword', 'shield', 'potion', 'magic ring']

# 2. Immutable Tuple (cannot change)
spawn_location = (100, 250)    # (x, y) coordinates
print(f"Spawn X: {spawn_location[0]}, Y: {spawn_location[1]}")
# spawn_location[0] = 50       # ERROR! Tuples cannot be modified`,
    questions: [
      "What is the primary difference between a Python list and a tuple?",
      "How do you access the very first item and the very last item of a list using indexing?",
      "When is it better to use a tuple instead of a list in a Python program?"
    ]
  },

  "py-8": {
    title: "Dictionaries & Sets",
    summary: [
      "Dictionaries and Sets are fast, hash-based collections in Python defined with curly braces {}.",
      "A dictionary stores data in key-value pairs (e.g. {\"name\": \"Gandalf\", \"level\": 20}). Keys must be unique and hashable (like strings or integers). You lookup values instantly by key rather than numeric index.",
      "A set is an unordered collection of UNIQUE elements. Sets automatically discard duplicate entries and provide mathematical set operations like union, intersection, and difference."
    ],
    keyPoints: [
      "Dictionary Pairs: Stored as {key: value}. Access values with dict[key] or dict.get(key, fallback).",
      "Set Uniqueness: Sets only keep unique values. Adding 'sword' twice results in a single 'sword'.",
      "Fast Lookup: Both dictionaries and sets use hashing for near-instant O(1) lookups."
    ],
    codeExample: `# 1. Dictionary (Key-Value associations)
hero = {"name": "Valen", "class": "Warrior", "hp": 120}
print(hero["name"])       # Output: Valen
hero["hp"] = 150          # Update value
hero["mana"] = 40         # Add new key-value pair

# 2. Set (Unique items only, duplicates discarded)
spells = {"fireball", "heal", "teleport"}
spells.add("heal")        # Duplicate ignored!
print(spells)             # {'fireball', 'heal', 'teleport'}`,
    questions: [
      "How does a Python dictionary store data using key-value pairs, and how do you access a value by its key?",
      "Why can a Python set not contain duplicate elements?",
      "What does the dictionary .get() method do that makes it safer than using square bracket indexing dict[key]?"
    ]
  },

  "py-9": {
    title: "String Manipulation",
    summary: [
      "Strings in Python are immutable sequences of Unicode characters. Python provides powerful methods for formatting, slicing, and transforming text.",
      "String slicing allows you to extract substrings using the syntax text[start:stop:step]. The 'start' index is inclusive, 'stop' is exclusive, and 'step' controls the stride (e.g., text[::-1] reverses a string).",
      "Common string methods include .upper(), .lower(), .strip() (removes surrounding whitespace), .split() (splits into a list), and .replace()."
    ],
    keyPoints: [
      "Slicing Syntax: text[start:stop:step]. Omit start for beginning, omit stop for end.",
      "Step Parameter: text[::2] selects every second character; text[::-1] reverses the string.",
      "Useful Methods: .strip() removes whitespace; .split(',') splits a CSV line into a list.",
      "Immutability: String methods return a NEW string; they never modify the original string in-place."
    ],
    codeExample: `spell = "  abracadabra  "

# 1. Cleaning and casing
clean_spell = spell.strip().upper()  # "ABRACADABRA"

# 2. Slicing substrings [start:stop:step]
prefix = clean_spell[0:4]            # "ABRA" (indices 0, 1, 2, 3)
reversed_spell = clean_spell[::-1]   # Reverses: "ARBADACARBA"

# 3. Splitting into words
inventory = "sword,potion,shield"
items = inventory.split(",")         # ['sword', 'potion', 'shield']`,
    questions: [
      "How does string slicing with [start:stop:step] work in Python?",
      "How can you quickly reverse a string in Python using slicing?",
      "Why do string methods like .upper() or .replace() return a new string instead of modifying the existing one?"
    ]
  },

  "py-10": {
    title: "File Handling",
    summary: [
      "Python allows you to read from and write to disk files using the built-in open() function.",
      "BEST PRACTICE: Always use the 'with open(...) as file:' statement (a context manager). The context manager automatically ensures that the file is safely closed when the block finishes, even if an unexpected error or crash occurs inside.",
      "File modes include: 'r' (read), 'w' (write — overwrites existing file), and 'a' (append — adds content to the end)."
    ],
    keyPoints: [
      "Context Manager: 'with open(...) as f:' guarantees file closure and prevents resource leaks.",
      "Modes: 'r' for reading, 'w' for writing (overwrites), 'a' for appending (adds to end).",
      "Reading: f.read() reads all content; f.readlines() reads lines into a list; 'for line in f:' iterates line by line."
    ],
    codeExample: `# 1. Writing to a file (safely closes automatically!)
with open("quest_log.txt", "w") as file:
    file.write("Day 1: Defeated the forest goblin.\\n")
    file.write("Day 2: Discovered the ancient dungeon.\\n")

# 2. Reading line by line from the file
with open("quest_log.txt", "r") as file:
    for line in file:
        print("LOG:", line.strip())`,
    questions: [
      "Why is it best practice to use the 'with open(...)' statement when reading or writing files in Python?",
      "What is the difference between file mode 'w' (write) and file mode 'a' (append)?",
      "How do you iterate through a file line-by-line in Python?"
    ]
  },

  "py-11": {
    title: "Exception Handling",
    summary: [
      "Exceptions are runtime errors (like trying to divide by zero or opening a non-existent file) that crash your program if not caught.",
      "Python provides try, except, and finally blocks to handle errors gracefully. Code that might fail is placed in the 'try' block. If an error occurs, control jumps to the 'except' block.",
      "The 'finally' block is guaranteed to run under all circumstances—whether an error occurred or not—making it ideal for cleanup tasks."
    ],
    keyPoints: [
      "Try Block: Wraps potentially dangerous operations.",
      "Except Block: Catches specific exceptions (e.g. ValueError, FileNotFoundError) and handles them.",
      "Finally Block: Always executes unconditionally, regardless of whether an exception occurred.",
      "Catch Specific Errors: Avoid bare 'except:'; catch specific error types to avoid hiding unexpected bugs."
    ],
    codeExample: `try:
    user_input = "forty"
    number = int(user_input)     # Will trigger a ValueError!
    result = 100 / number
except ValueError:
    print("Caught Error: Please enter numeric digits only!")
except ZeroDivisionError:
    print("Caught Error: Cannot divide by zero!")
finally:
    print("Cleanup: Operation attempt completed.")`,
    questions: [
      "What is the purpose of the try-except block in Python?",
      "When is the 'finally' block guaranteed to execute in a try-except structure?",
      "Why should you catch specific errors (like ValueError) instead of using a generic bare 'except:'?"
    ]
  },

  "py-12": {
    title: "OOP — Classes & Objects",
    summary: [
      "Object-Oriented Programming (OOP) is a paradigm that organizes software design around data entities (objects) rather than just functions and logic.",
      "A Class is a blueprint that defines attributes (data) and methods (behaviors). An Object is a concrete instance created from that class blueprint.",
      "The __init__ method is Python's constructor. It initializes new object instances. The 'self' parameter represents the specific instance being created, allowing you to attach variables (like self.name) to it."
    ],
    keyPoints: [
      "Class Blueprint: Declared with 'class Hero:'. Objects are created with 'hero1 = Hero()'.",
      "Constructor (__init__): Automatically runs when a new instance is born to initialize attributes.",
      "The 'self' Parameter: The first argument of instance methods; references the specific object instance.",
      "Encapsulation: Bundles data attributes and methods operating on that data inside one cohesive unit."
    ],
    codeExample: `class Knight:
    # Constructor initializes attributes for each new knight
    def __init__(self, name, shield_points):
        self.name = name                 # Instance attribute
        self.shield_points = shield_points

    # Instance method
    def defend(self, damage):
        self.shield_points -= damage
        print(f"{self.name}'s shield absorbed hit! Shield at: {self.shield_points}")

# Creating concrete objects
galahad = Knight("Sir Galahad", 50)
galahad.defend(15)  # Output: Sir Galahad's shield absorbed hit! Shield at: 35`,
    questions: [
      "What is the purpose of the __init__ method in a Python class?",
      "What does the 'self' parameter represent inside class methods?",
      "What is the difference between a class and an object?"
    ]
  },

  "py-13": {
    title: "OOP — Inheritance & Polymorphism",
    summary: [
      "Inheritance allows a new class (child/subclass) to inherit attributes and methods from an existing class (parent/superclass), promoting code reuse.",
      "In Python, child classes declare inheritance by passing the parent class name in parentheses: class Mage(Hero):.",
      "If a child class overrides a parent method but still wants to run the parent's original logic, it calls super().method_name(). Polymorphism allows different child classes to be treated through a common interface while providing custom behaviors."
    ],
    keyPoints: [
      "Inheritance Syntax: class ChildClass(ParentClass): inherits all parent attributes and methods.",
      "super() Function: Calls the parent class's constructor or methods from inside the child class.",
      "Method Overriding: Child classes can define their own version of a parent method with custom behavior.",
      "Polymorphism: Different classes can respond to the same method name in their own specialized way."
    ],
    codeExample: `class Hero:
    def __init__(self, name):
        self.name = name

    def attack(self):
        print(f"{self.name} swings a basic weapon.")

# Mage inherits from Hero
class Mage(Hero):
    def __init__(self, name, mana):
        super().__init__(name)  # Calls parent Hero constructor!
        self.mana = mana

    def attack(self):           # Overrides attack method (Polymorphism)
        print(f"{self.name} casts an arcane fireball costing {self.mana} mana!")

merlin = Mage("Merlin", 25)
merlin.attack()  # Output: Merlin casts an arcane fireball costing 25 mana!`,
    questions: [
      "How does a child class inherit from a parent class in Python syntax?",
      "What is the purpose of the super() function in a child class?",
      "What is method overriding, and how does it demonstrate polymorphism?"
    ]
  },

  "py-14": {
    title: "Modules & Packages",
    summary: [
      "As programs grow, code is organized into separate files called modules, and directories called packages.",
      "A Module is simply a single Python file (.py) containing functions, classes, and variables that can be imported into other files using 'import module_name'. A Package is a directory containing multiple modules and an __init__.py file.",
      "The check 'if __name__ == \"__main__\":' checks whether the file is being run directly as the main script or being imported into another module."
    ],
    keyPoints: [
      "Importing: Use 'import math' or 'from math import sqrt' to bring external functions into your script.",
      "Module vs Package: A module is a single .py file; a package is a directory containing an __init__.py file.",
      "__name__ == '__main__': Ensures test code only executes when the file is run directly, not when imported."
    ],
    codeExample: `# Inside a module named combat_utils.py:
def roll_dice(sides=6):
    import random
    return random.randint(1, sides)

# Only executes if run directly from terminal (not when imported)
if __name__ == "__main__":
    print(f"Direct test run: Rolled a {roll_dice(20)}")`,
    questions: [
      "What is the difference between a Python module and a Python package?",
      "What is the purpose of the if __name__ == '__main__': statement in a Python script?",
      "How do you import a specific function from a module using the 'from ... import ...' syntax?"
    ]
  },

  "py-15": {
    title: "List/Dict Comprehensions",
    summary: [
      "Comprehensions provide a concise, expressive syntax for creating new lists, dictionaries, or sets from existing iterables in a single line.",
      "Instead of creating an empty list and appending items inside a multi-line for loop, a list comprehension uses the format: [expression for item in iterable if condition].",
      "Comprehensions are not only more readable, but they also execute faster in Python because they run at optimized C-speed under the hood."
    ],
    keyPoints: [
      "List Comprehension Syntax: [expr for item in iterable] creates a transformed list.",
      "Filtering: Add an 'if' clause at the end to filter elements: [x for x in nums if x % 2 == 0].",
      "Dict Comprehension: {key_expr: val_expr for item in iterable} creates dictionaries dynamically.",
      "Readability Rule: Keep comprehensions simple; if logic exceeds one or two clauses, use a standard loop."
    ],
    codeExample: `numbers = [1, 2, 3, 4, 5, 6]

# 1. Standard list comprehension (squares of even numbers only)
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
print(even_squares)  # Output: [4, 16, 36]

# 2. Dictionary comprehension
scores = {"Alice": 85, "Bob": 40, "Charlie": 92}
passed_students = {name: score for name, score in scores.items() if score >= 50}
print(passed_students)  # Output: {'Alice': 85, 'Charlie': 92}`,
    questions: [
      "What is the basic syntax of a Python list comprehension?",
      "How do you add a condition to a list comprehension to filter out unwanted items?",
      "Why are list comprehensions generally preferred over initializing an empty list and calling .append() in a loop?"
    ]
  },

  "py-16": {
    title: "Decorators & Generators",
    summary: [
      "Decorators and Generators are advanced Python features for function enhancement and efficient iteration.",
      "A Decorator is a function that takes another function as input, extends its behavior without modifying its source code, and returns the enhanced function. It is applied using the '@decorator_name' syntax.",
      "A Generator is a special function that produces a sequence of values on-the-fly using the 'yield' keyword instead of 'return'. Generators save huge amounts of memory because they generate values lazily one at a time on demand rather than storing millions of items in RAM."
    ],
    keyPoints: [
      "Decorators (@): Wrap and augment functions (e.g. for logging, timing, authentication) cleanly.",
      "The 'yield' Keyword: Pauses generator execution and returns a value, resuming from that spot on next iteration.",
      "Lazy Evaluation: Generators produce items on demand, preventing out-of-memory errors on massive datasets.",
      "Generator Objects: Are iterators; they can be looped over with 'for item in my_generator:'."
    ],
    codeExample: `# 1. Generator function yielding values lazily
def countdown(seconds):
    while seconds > 0:
        yield seconds   # Pauses and yields value without exiting!
        seconds -= 1

# Looping over generator (only one number exists in memory at a time)
for tick in countdown(3):
    print(f"Time remaining: {tick}...")
print("Blast off!")`,
    questions: [
      "What does the 'yield' keyword do inside a Python generator function?",
      "How does a generator save memory compared to returning a full list of items?",
      "What is a Python decorator, and what syntax symbol is used to apply it above a function?"
    ]
  }
};
