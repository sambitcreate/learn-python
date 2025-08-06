export type Course = {
  slug: string;
  title: string;
  description: string;
  prompt: string;
  placeholder?: string;
  rule: { type: "equals" | "includesAny" | "equalsCaseInsensitive" | "keywordEQ"; value?: string | string[]; };
  hint?: string;
  lesson?: string;
};

export type Level = {
  id: number;
  title: string;
  description: string;
  courses: Course[];
  unlocked: boolean;
};

// Level 1 - Basic Python (existing puzzles)
const level1Courses: Course[] = [
  {
    slug: 'intro',
    title: 'Intro: print()',
    description: 'Basics of printing text to the console.',
    prompt: 'What Python function prints text to the console?',
    placeholder: 'Type the exact function name...',
    rule: { type: "equals", value: "print" },
    hint: 'Try: print("Hello")',
    lesson: `The print() function is one of the most fundamental and frequently used functions in Python programming. It serves as your primary tool for displaying output to the console, making it essential for debugging, user interaction, and program feedback. Whether you're showing results of calculations, displaying messages to users, or debugging your code by checking variable values, print() is your go-to function.

In Python 3, print() is a function that requires parentheses, unlike Python 2 where it was a statement. You can print strings by enclosing them in quotes: print("Hello, World!"), numbers directly: print(42), or variables: print(my_variable). The function automatically adds a newline character at the end, so each print() call appears on a new line. You can also print multiple items by separating them with commas: print("The answer is", 42).

The print() function is incredibly versatile and accepts various parameters to customize its behavior. You can change the separator between items using the sep parameter, modify the ending character with end, and even redirect output to files using the file parameter. Understanding print() thoroughly will make your Python journey much smoother and help you build interactive programs from day one.`,
  },
  {
    slug: 'comments',
    title: 'Comments',
    description: 'Single-line comments start with a special character.',
    prompt: 'Which character starts a single-line comment in Python?',
    rule: { type: "equals", value: "#" },
    hint: 'Common across many languages for quick notes.',
    lesson: `Comments are crucial for writing maintainable and understandable code. They allow you to add explanations, notes, and documentation directly within your code without affecting its execution. In Python, single-line comments begin with the hash symbol (#), and everything after this symbol on the same line is ignored by the Python interpreter. This makes comments perfect for explaining complex logic, documenting your thought process, or temporarily disabling code during development.

Good commenting practices involve explaining why something is done rather than what is being done. For example, instead of writing "# increment x by 1", write "# adjust for zero-based indexing". Comments should add value and context that isn't immediately obvious from reading the code itself. They're particularly useful for explaining business logic, algorithm choices, or any non-obvious implementation details.

Python also supports multi-line comments using triple quotes (""" or '''). While technically these are string literals, when not assigned to a variable, they effectively serve as multi-line comments. However, for single-line explanations, the # symbol remains the standard and most readable approach. Remember, well-commented code is a gift to your future self and your teammates.`,
  },
  {
    slug: 'variables',
    title: 'Variables',
    description: 'Dynamic typing and simple assignments.',
    prompt: 'Fill the blank to assign 42 to x: x ____ 42',
    placeholder: 'Enter the operator...',
    rule: { type: "equals", value: "=" },
    hint: 'One character.',
    lesson: `Variables in Python are like labeled containers that store data values. Unlike many other programming languages, Python uses dynamic typing, which means you don't need to declare the type of a variable explicitly. When you assign a value to a variable, Python automatically determines its type based on the value. The assignment operator (=) is used to store values in variables, creating a reference between the variable name and the data in memory.

Python variable names must follow specific rules: they can contain letters, numbers, and underscores, but cannot start with a number. They are case-sensitive, so "myVariable" and "myvariable" are different. It's a Python convention to use lowercase letters with underscores for variable names (snake_case), such as "user_name" or "total_count". Good variable names should be descriptive and meaningful, making your code self-documenting.

One of Python's powerful features is that variables can be reassigned to different types during program execution. For example, a variable that initially holds an integer can later be assigned a string or a list. This flexibility makes Python very expressive and easy to work with, though it also means you need to be mindful of what type of data your variables contain at any given point in your program.`,
  },
  {
    slug: 'strings',
    title: 'Strings',
    description: 'Quotes and concatenation.',
    prompt: 'Which quotes can define strings in Python? List any one of: __ or __',
    placeholder: 'Answer like: single quotes',
    rule: { type: "includesAny", value: ["single", "double"] },
    hint: 'Two common kinds.',
    lesson: `Strings are one of the most important data types in Python, representing sequences of characters used for text processing, user input, file names, and much more. Python provides flexible ways to create strings using different types of quotes. You can use single quotes (') or double quotes (") interchangeably for most string literals. This flexibility allows you to include one type of quote inside a string defined with the other type, such as "He said 'Hello'" or 'She said "Hi"'.

Python also supports triple quotes (""" or ''') for multi-line strings, which are particularly useful for documentation strings (docstrings), long text blocks, or when you need to preserve formatting including line breaks. Triple-quoted strings can span multiple lines without requiring escape characters for newlines. This makes them perfect for writing readable code that includes substantial text content.

String manipulation is a core skill in Python programming. You can concatenate strings using the + operator, repeat them with *, and access individual characters using indexing with square brackets. Python strings are immutable, meaning once created, they cannot be changed in place. Instead, string operations create new string objects. Understanding string basics sets the foundation for more advanced text processing techniques you'll encounter in real-world programming.`,
  },
  {
    slug: 'fstrings',
    title: 'f-Strings',
    description: 'Interpolating expressions in strings.',
    prompt: 'What prefix enables string interpolation in Python 3.6+?',
    rule: { type: "equalsCaseInsensitive", value: "f" },
    hint: 'Like f"Hello {name}"',
    lesson: `f-Strings (formatted string literals) revolutionized string formatting in Python 3.6+ by providing a clean, readable, and efficient way to embed expressions directly within string literals. By prefixing a string with 'f' or 'F', you can include any valid Python expression inside curly braces {} within the string. This makes code much more readable compared to older formatting methods like % formatting or .format() calls.

The power of f-strings lies in their simplicity and expressiveness. You can embed variables (f"Hello {name}"), call functions (f"Result: {calculate_sum(a, b)}"), access object attributes (f"User: {user.name}"), and even include complex expressions (f"Total: {sum(prices) * tax_rate:.2f}"). The expressions inside the braces are evaluated at runtime and automatically converted to strings, making f-strings both powerful and intuitive.

f-Strings also support format specifications for controlling how values are displayed. You can specify decimal places for numbers (f"{value:.2f}"), padding and alignment (f"{text:>10}"), and many other formatting options. This combination of readability, performance, and flexibility has made f-strings the preferred method for string formatting in modern Python code.`,
  },
  {
    slug: 'lists',
    title: 'Lists',
    description: 'Mutable ordered collections.',
    prompt: 'Which brackets define a list literal?',
    rule: { type: "includesAny", value: ["[]", "square"] },
    hint: 'They are square.',
    lesson: `Lists are one of Python's most versatile and commonly used data structures. They represent ordered collections of items that can be of any type - numbers, strings, other lists, or even mixed types within the same list. Lists are defined using square brackets [] with items separated by commas, such as [1, 2, 3] or ["apple", "banana", "cherry"]. An empty list is simply [].

What makes lists particularly powerful is that they are mutable, meaning you can modify them after creation. You can add items using append() or insert(), remove items with remove() or pop(), and change existing items by assigning new values to specific indices. Lists maintain the order of elements, so you can access items by their position using indexing (starting from 0) or use negative indices to count from the end.

Lists support many useful operations including slicing to extract portions of the list, concatenation with the + operator, and repetition with *. They also provide methods for sorting, reversing, and finding elements. Understanding lists is crucial because they form the foundation for more advanced concepts like list comprehensions and serve as the building blocks for many algorithms and data processing tasks in Python.`,
  },
  {
    slug: 'dicts',
    title: 'Dictionaries',
    description: 'Key-value mappings.',
    prompt: 'Which braces define a dictionary literal?',
    rule: { type: "includesAny", value: ["{}", "curly"] },
    hint: 'They are curly.',
    lesson: `Dictionaries are Python's implementation of associative arrays or hash maps, providing a way to store data as key-value pairs. They are defined using curly braces {} with key-value pairs separated by commas and keys separated from values by colons, like {"name": "Alice", "age": 30}. Dictionaries are incredibly useful for organizing related data and creating structured representations of real-world entities.

The keys in a dictionary must be immutable types (strings, numbers, tuples) and must be unique, while values can be of any type and can be duplicated. You access dictionary values using square bracket notation with the key: user["name"] returns "Alice". Dictionaries are mutable, so you can add new key-value pairs, modify existing values, or remove entries after creation.

Dictionaries are optimized for fast lookups, making them excellent for scenarios where you need to quickly find data based on a unique identifier. They're commonly used for caching, counting occurrences, grouping data, and representing structured information like configuration settings or database records. Modern Python dictionaries (3.7+) also maintain insertion order, combining the benefits of fast access with predictable iteration order.`,
  },
  {
    slug: 'if',
    title: 'Conditions',
    description: 'Branching logic.',
    prompt: 'What keyword begins a conditional block?',
    rule: { type: "equalsCaseInsensitive", value: "if" },
    hint: 'It pairs with elif/else.',
    lesson: `Conditional statements are fundamental to programming logic, allowing your code to make decisions and execute different paths based on specific conditions. In Python, the if statement is the primary tool for implementing conditional logic. It evaluates a boolean expression and executes the associated code block only when the condition is True. This enables programs to respond dynamically to different inputs, user choices, or changing data conditions.

Python's conditional syntax is clean and readable, using the keywords if, elif (else if), and else to create decision trees. The basic structure is: if condition: followed by an indented code block. You can chain multiple conditions using elif for additional checks, and provide a fallback with else. For example: if temperature > 30: print("Hot") elif temperature > 20: print("Warm") else: print("Cool"). Each condition is evaluated in order until one is found to be True.

Python uses indentation (typically 4 spaces) to define code blocks, making the structure visually clear and enforcing good coding practices. Conditional expressions can use comparison operators (==, !=, <, >, <=, >=), logical operators (and, or, not), and membership operators (in, not in). You can also use boolean values directly or any expression that evaluates to True or False. Mastering conditional logic is essential for creating interactive and intelligent programs.`,
  },
  {
    slug: 'for',
    title: 'Loops',
    description: 'Iterating over iterables.',
    prompt: 'Complete: for x ____ range(3):',
    placeholder: 'Enter the keyword...',
    rule: { type: "equalsCaseInsensitive", value: "in" },
    hint: 'Tiny keyword.',
    lesson: `Loops are essential programming constructs that allow you to repeat code execution multiple times, making your programs more efficient and reducing code duplication. Python's for loop is particularly powerful because it can iterate over any iterable object, including lists, strings, tuples, dictionaries, and ranges. The basic syntax uses the 'in' keyword: for item in iterable: followed by an indented code block that executes once for each item in the sequence.

The range() function is commonly used with for loops to generate sequences of numbers. range(n) creates numbers from 0 to n-1, range(start, stop) creates numbers from start to stop-1, and range(start, stop, step) allows you to specify the increment. For example: for i in range(5): creates a loop that runs 5 times with i taking values 0, 1, 2, 3, 4. This is perfect for when you need to repeat an action a specific number of times or access list elements by index.

Python's for loops are more intuitive than traditional counter-based loops found in other languages. You can iterate directly over list elements (for name in names:), string characters (for char in "hello":), or dictionary keys (for key in my_dict:). The loop variable automatically takes on each value in the sequence, eliminating the need for manual indexing and reducing the chance of off-by-one errors. Understanding for loops opens the door to processing collections of data efficiently.`,
  },
  {
    slug: 'functions',
    title: 'Functions',
    description: 'Defining reusable blocks.',
    prompt: 'What keyword defines a function?',
    rule: { type: "equalsCaseInsensitive", value: "def" },
    hint: 'Three letters.',
    lesson: `Functions are the building blocks of organized, reusable code that allow you to break down complex problems into smaller, manageable pieces. In Python, functions are defined using the 'def' keyword followed by the function name, parentheses containing any parameters, and a colon. The function body is indented and can include a return statement to send a value back to the caller. Functions promote code reusability, making your programs more modular, easier to test, and simpler to maintain.

Well-designed functions follow the principle of "doing one thing well" - they should have a clear, single purpose that can be understood from their name and parameters. Functions can accept zero or more parameters (inputs) and can return zero or one value (output). For example: def calculate_area(length, width): return length * width. This function has a clear purpose, descriptive name, and predictable behavior. You can call functions by using their name followed by parentheses containing any required arguments.

Python functions support default parameter values, making them flexible and easy to use. You can also include docstrings (triple-quoted strings) immediately after the function definition to document what the function does, its parameters, and return value. Good documentation makes your functions more professional and helps other developers (including your future self) understand how to use them correctly. Functions are essential for writing clean, professional Python code.`,
  },
  {
    slug: 'imports',
    title: 'Imports',
    description: 'Using modules.',
    prompt: 'Fill: ____ math; print(math.pi)',
    placeholder: 'Enter the statement...',
    rule: { type: "equalsCaseInsensitive", value: "import" },
    hint: 'Starts with i...',
    lesson: `Python's import system is one of its greatest strengths, allowing you to leverage thousands of pre-written modules and libraries to extend your program's capabilities. The import statement lets you access code from Python's standard library, third-party packages, or your own custom modules. This modular approach means you don't have to reinvent the wheel - you can build upon existing, tested code to create powerful applications more efficiently.

There are several ways to import modules in Python. The basic 'import module_name' brings in the entire module, and you access its contents using dot notation (math.pi, math.sqrt()). You can also import specific items with 'from module_name import item_name', which lets you use the item directly without the module prefix. For convenience, you can create aliases using 'import module_name as alias' or 'from module_name import item_name as alias', which is especially useful for modules with long names.

Python comes with an extensive standard library covering everything from mathematical operations (math, statistics) to web development (urllib, http), file handling (os, pathlib), and data processing (json, csv). Beyond the standard library, the Python Package Index (PyPI) hosts hundreds of thousands of third-party packages that you can install using pip. Understanding imports is crucial for becoming a productive Python developer and tapping into the vast ecosystem of available tools and libraries.`,
  },
];

// Level 2 - Intermediate Python Foundations
const level2Courses: Course[] = [
  {
    slug: 'tuples-sets',
    title: 'Advanced Data Structures - Tuples and Sets',
    description: 'Master immutable tuples and unique sets for efficient data handling.',
    prompt: 'What data structure is immutable and ordered in Python?',
    rule: { type: "equalsCaseInsensitive", value: "tuple" },
    hint: 'Think of coordinates that shouldn\'t change.',
    lesson: `Tuples and sets represent two powerful data structures that complement lists and dictionaries in Python's toolkit. Tuples are immutable, ordered collections that are perfect for storing related data that shouldn't change, such as coordinates (x, y), RGB color values (255, 128, 0), or database records. Once created with parentheses like coords = (10, 20), tuples cannot be modified, making them ideal for data integrity and as dictionary keys. Their immutability also makes them hashable, enabling their use in sets and as dictionary keys.

Sets are unordered collections of unique elements, eliminating duplicates automatically and providing fast membership testing. Created with curly braces like unique_nums = {1, 2, 3} or using set(), they're perfect for removing duplicates from lists, finding common elements between collections, or checking membership efficiently. Sets support mathematical operations like union (|), intersection (&), difference (-), and symmetric difference (^), making them excellent for data analysis and comparison tasks.

Both data structures offer performance advantages in specific scenarios. Tuples are more memory-efficient than lists and provide faster iteration, while sets offer O(1) average-case lookup time compared to O(n) for lists. Understanding when to use tuples versus lists (immutable vs mutable) and sets versus lists (unique elements vs duplicates allowed) is crucial for writing efficient Python code. These structures are fundamental building blocks for more advanced programming patterns and algorithms.`,
  },
  {
    slug: 'dict-mastery',
    title: 'Dictionary Mastery and Advanced Techniques',
    description: 'Deep dive into dictionaries, comprehensions, and advanced patterns.',
    prompt: 'What method returns all keys from a dictionary?',
    rule: { type: "equalsCaseInsensitive", value: "keys" },
    hint: 'It\'s a method that returns dictionary keys.',
    lesson: `Advanced dictionary usage goes far beyond basic key-value storage, encompassing powerful methods and techniques that make Python exceptionally suited for data manipulation and analysis. The fundamental dictionary methods - keys(), values(), and items() - provide different views of your data. dict.keys() returns all keys, dict.values() returns all values, and dict.items() returns key-value pairs as tuples. These views are dynamic, meaning they reflect changes to the original dictionary, and they're memory-efficient because they don't create copies of the data.

Dictionary comprehensions are a concise and powerful way to create dictionaries from iterables or transform existing dictionaries. The syntax {key_expr: value_expr for item in iterable} allows you to build dictionaries in a single line. For example: {word: len(word) for word in words} creates a dictionary mapping words to their lengths. You can also include conditions: {k: v for k, v in items if condition}. This functional programming approach often replaces multiple lines of traditional loops with more readable and efficient code.

Modern Python dictionaries offer additional powerful features like the get() method with default values, setdefault() for conditional insertion, and update() for merging dictionaries. The collections module provides specialized dictionary variants like defaultdict (automatic default values), Counter (counting occurrences), and OrderedDict (though regular dicts maintain order in Python 3.7+). Understanding these advanced dictionary patterns is essential for data processing, configuration management, and building efficient algorithms in Python.`,
  },
  {
    slug: 'string-processing',
    title: 'String Processing and Text Manipulation',
    description: 'Advanced string operations, formatting, and regular expressions.',
    prompt: 'What module provides regular expression support in Python?',
    rule: { type: "equalsCaseInsensitive", value: "re" },
    hint: 'Two letters, starts with r.',
    lesson: `String processing is a cornerstone of many Python applications, from web scraping and data cleaning to log analysis and natural language processing. Python provides an extensive toolkit for text manipulation, starting with built-in string methods like split(), join(), strip(), replace(), and find(). These methods handle common tasks efficiently: text.split(',') splits on commas, ' '.join(words) combines a list into a string, and text.strip() removes whitespace. Understanding string immutability is crucial - these methods return new strings rather than modifying the original.

Regular expressions, accessed through the 're' module, provide powerful pattern matching capabilities for complex text processing tasks. Common functions include re.search() to find the first match, re.findall() to find all matches, re.sub() for substitution, and re.match() to check if a pattern matches from the start. Raw strings (r"pattern") are typically used for regex patterns to avoid escaping backslashes. For example: re.search(r"\d+", "abc123") finds the first sequence of digits. Regular expressions are essential for validating input, extracting data from text, and sophisticated text transformations.

Modern Python string processing also leverages f-strings for readable formatting, the string module for constants and templates, and third-party libraries like regex for advanced features. Best practices include compiling frequently-used regex patterns for performance, using string methods for simple operations before reaching for regex, and considering libraries like pandas for large-scale text processing. Mastering string processing opens doors to web development, data science, and automation tasks where text manipulation is central.`,
  },
  {
    slug: 'function-params',
    title: 'Functions - Parameters and Return Values',
    description: 'Master function parameters, *args, **kwargs, and scope.',
    prompt: 'What syntax allows a function to accept unlimited positional arguments?',
    rule: { type: "equals", value: "*args" },
    hint: 'Uses an asterisk before the parameter name.',
    lesson: `Advanced function parameter handling in Python provides incredible flexibility for creating robust, reusable functions that can adapt to different calling patterns. The *args syntax allows functions to accept any number of positional arguments, collecting them into a tuple. This is perfect for functions that need to work with varying numbers of inputs, like a sum function that can add 2, 5, or 20 numbers. Similarly, **kwargs collects keyword arguments into a dictionary, enabling functions to handle named parameters dynamically. Together, they create functions that can accept virtually any combination of arguments.

Python functions support multiple parameter types in a specific order: regular parameters, default parameters, *args, keyword-only parameters, and **kwargs. For example: def func(required, default="value", *args, keyword_only, **kwargs). Default parameters provide fallback values when arguments aren't provided, making functions more convenient to use. Keyword-only parameters (after *args) must be passed by name, improving code clarity and preventing errors from positional argument mismatches.

Understanding scope is crucial for effective function design. Variables defined inside functions have local scope and don't affect variables outside the function. The global and nonlocal keywords allow functions to modify variables in outer scopes when necessary, though this should be used sparingly. Return statements can send single values, tuples (for multiple values), or None (default). Well-designed functions with clear parameter patterns and appropriate scope usage are essential for building maintainable, professional Python applications.`,
  },
  {
    slug: 'error-handling',
    title: 'Error Handling and Exceptions',
    description: 'Robust error handling with try-except blocks and custom exceptions.',
    prompt: 'What keyword is used to catch exceptions in Python?',
    rule: { type: "equalsCaseInsensitive", value: "except" },
    hint: 'Pairs with try.',
    lesson: `Exception handling is fundamental to writing robust Python applications that can gracefully handle unexpected situations without crashing. The try-except mechanism allows you to anticipate potential errors and respond appropriately, whether that means providing user-friendly error messages, attempting alternative approaches, or logging issues for debugging. Python's exception handling follows the "Easier to Ask for Forgiveness than Permission" (EAFP) principle, encouraging you to attempt operations and handle failures rather than checking conditions beforehand.

The basic try-except structure wraps potentially problematic code in a try block and defines how to handle specific exceptions in except blocks. You can catch specific exception types (except ValueError:), multiple types (except (ValueError, TypeError):), or use a general except clause as a fallback. The else clause runs only if no exceptions occurred, while finally always executes regardless of whether an exception was raised, making it perfect for cleanup operations like closing files or network connections.

Python provides a rich hierarchy of built-in exceptions, from general Exception to specific types like FileNotFoundError, KeyError, and IndexError. You can also create custom exceptions by inheriting from Exception or its subclasses, allowing you to define application-specific error conditions. Best practices include catching specific exceptions rather than using bare except clauses, providing meaningful error messages, and using logging to record exceptions for debugging. Proper exception handling transforms fragile scripts into professional, user-friendly applications.`,
  },
  {
    slug: 'file-io',
    title: 'File I/O and Context Managers',
    description: 'Reading and writing files safely with context managers.',
    prompt: 'What keyword is used with open() for safe file handling?',
    rule: { type: "equalsCaseInsensitive", value: "with" },
    hint: 'Creates a context for resource management.',
    lesson: `File input/output operations are essential for most real-world Python applications, from reading configuration files and processing data to generating reports and logs. Python's built-in open() function provides access to files with various modes: 'r' for reading, 'w' for writing (overwrites existing content), 'a' for appending, and 'x' for exclusive creation. You can also specify text or binary mode and encoding options. However, manually managing file handles with open() and close() is error-prone and can lead to resource leaks if exceptions occur.

Context managers, used with the 'with' statement, solve resource management problems elegantly by automatically handling setup and cleanup operations. When you use 'with open("file.txt", "r") as f:', Python automatically closes the file when the block exits, even if an exception occurs. This pattern ensures proper resource cleanup and makes code more readable and reliable. Context managers work through the __enter__ and __exit__ methods, and Python provides many built-in context managers beyond file operations.

Modern file I/O practices emphasize using pathlib for path manipulation, specifying encoding explicitly (usually UTF-8), and choosing appropriate file methods like read(), readline(), readlines() for input and write(), writelines() for output. For large files, consider reading in chunks or line-by-line to manage memory usage. The csv, json, and pickle modules provide specialized file handling for common data formats. Understanding file I/O and context managers is crucial for data processing, configuration management, and building applications that interact with the file system.`,
  },
  {
    slug: 'list-comprehensions',
    title: 'List Comprehensions and Generators',
    description: 'Efficient data processing with comprehensions and generator expressions.',
    prompt: 'What creates a list comprehension? [x for x in ____]',
    placeholder: 'Enter what goes after "in"...',
    rule: { type: "includesAny", value: ["range", "iterable", "list"] },
    hint: 'Any sequence or iterable object.',
    lesson: `List comprehensions represent one of Python's most elegant and powerful features, providing a concise way to create lists from existing iterables while applying transformations and filters. The basic syntax [expression for item in iterable] replaces traditional for loops with a more readable and often faster alternative. For example, [x*2 for x in range(5)] creates [0, 2, 4, 6, 8] in a single line. You can also add conditions: [x for x in numbers if x > 0] filters positive numbers, combining transformation and filtering in one expression.

Generator expressions use the same syntax but with parentheses instead of square brackets: (x*2 for x in range(5)). Unlike list comprehensions that create the entire list in memory, generators produce values on-demand, making them memory-efficient for large datasets. This lazy evaluation is crucial when working with big data or infinite sequences. Generators are perfect for pipeline processing where you transform data step-by-step without storing intermediate results.

Python also supports dictionary comprehensions {k: v for item in iterable} and set comprehensions {expression for item in iterable}, extending the pattern to other data structures. Nested comprehensions allow processing of nested data structures, though readability should be prioritized over conciseness. Understanding when to use comprehensions versus traditional loops, and when to choose generators over lists, is essential for writing efficient, Pythonic code that handles data processing tasks elegantly and performantly.`,
  },
  {
    slug: 'oop-basics',
    title: 'Object-Oriented Programming Basics',
    description: 'Classes, objects, methods, and attributes fundamentals.',
    prompt: 'What keyword defines a class in Python?',
    rule: { type: "equalsCaseInsensitive", value: "class" },
    hint: 'Five letters, starts with c.',
    lesson: `Object-Oriented Programming (OOP) is a programming paradigm that organizes code around objects and classes, providing a powerful way to model real-world entities and their relationships. In Python, classes serve as blueprints for creating objects, defining both the data (attributes) and behaviors (methods) that objects of that type will have. The 'class' keyword begins a class definition, followed by the class name (conventionally in PascalCase) and a colon. Classes encapsulate related functionality, making code more organized, reusable, and easier to maintain.

The __init__ method is a special constructor method that initializes new objects when they're created. It's automatically called when you create an instance of a class, allowing you to set up initial attribute values. The 'self' parameter is crucial - it refers to the specific instance being operated on and must be the first parameter in all instance methods. For example: class Person: def __init__(self, name): self.name = name creates a Person class where each instance has a name attribute. You create objects by calling the class like a function: person = Person("Alice").

Instance methods are functions defined within a class that operate on specific objects, while attributes store data associated with each instance. Methods can access and modify instance attributes using self.attribute_name, and they can call other methods using self.method_name(). This encapsulation allows objects to maintain their own state while providing controlled access through methods. Understanding classes and objects is fundamental to advanced Python programming and essential for working with most Python libraries and frameworks.`,
  },
  {
    slug: 'modules-packages',
    title: 'Modules and Packages',
    description: 'Organizing code into reusable modules and packages.',
    prompt: 'What file makes a directory a Python package?',
    rule: { type: "equals", value: "__init__.py" },
    hint: 'Special file with double underscores.',
    lesson: `Modules and packages are Python's solution for organizing code into logical, reusable units that promote code organization, reusability, and namespace management. A module is simply a Python file containing definitions and statements, while a package is a directory containing multiple modules. Any Python file can serve as a module and be imported into other files, allowing you to break large programs into smaller, manageable pieces. This modular approach makes code easier to understand, test, and maintain while enabling code sharing across different projects.

The __init__.py file is the key to creating packages - it signals to Python that a directory should be treated as a package. This file can be empty or contain initialization code that runs when the package is first imported. Packages can contain subpackages, creating hierarchical structures like myproject/utils/string_helpers.py. You import from packages using dot notation: from myproject.utils import string_helpers or from myproject.utils.string_helpers import clean_text. This hierarchical organization helps manage large codebases and prevents naming conflicts.

Python's import system searches for modules in specific locations defined by sys.path, starting with the current directory, then installed packages, and finally the standard library. Best practices include using relative imports within packages (from .module import function), organizing related functionality into packages, and providing clear __init__.py files that expose the most commonly used functions and classes. Understanding modules and packages is essential for building scalable Python applications and effectively using third-party libraries.`,
  },
  {
    slug: 'testing-debugging',
    title: 'Testing and Debugging',
    description: 'Writing tests and debugging techniques for reliable code.',
    prompt: 'What module provides unit testing framework in Python?',
    rule: { type: "equalsCaseInsensitive", value: "unittest" },
    hint: 'Combines "unit" and "test".',
    lesson: `Testing and debugging are fundamental skills for writing reliable, maintainable Python code that works correctly under various conditions. Python's built-in unittest module provides a comprehensive framework for writing and running tests, following the xUnit pattern familiar to developers from other languages. Tests are organized into test cases (classes inheriting from unittest.TestCase) containing test methods (starting with 'test_'). Each test method should focus on testing one specific aspect of your code, using assertion methods like assertEqual(), assertTrue(), and assertRaises() to verify expected behavior.

Effective testing follows the Arrange-Act-Assert pattern: set up test data (arrange), execute the code being tested (act), and verify the results (assert). Good tests are independent, repeatable, and fast, covering both normal operation and edge cases. Python also supports other testing frameworks like pytest (more concise syntax) and doctest (tests embedded in docstrings). Test-driven development (TDD) encourages writing tests before implementation, helping clarify requirements and ensuring comprehensive test coverage.

Debugging techniques range from simple print statements to sophisticated tools like Python's built-in debugger (pdb). The debugger allows you to set breakpoints, step through code line by line, inspect variables, and evaluate expressions interactively. Modern IDEs provide visual debugging interfaces that make this process more intuitive. Other debugging strategies include logging (using the logging module), unit testing to isolate problems, and code review to catch issues early. Combining systematic testing with effective debugging practices leads to more robust, professional Python applications.`,
  },
];

// Level 3 - Advanced Python Concepts
const level3Courses: Course[] = [
  {
    slug: 'decorators',
    title: 'Decorators and Metaprogramming',
    description: 'Function and class decorators for code enhancement.',
    prompt: 'What symbol is used before a decorator name?',
    rule: { type: "equals", value: "@" },
    hint: 'At symbol.',
    lesson: `Decorators are one of Python's most powerful and elegant features, providing a clean way to modify or enhance functions and classes without changing their core implementation. A decorator is essentially a function that takes another function as input and returns a modified version of that function. The @ symbol provides syntactic sugar for applying decorators, making @decorator def function(): pass equivalent to function = decorator(function). This pattern enables separation of concerns, allowing you to add functionality like logging, timing, authentication, or caching to existing functions without cluttering their main logic.

Common built-in decorators include @property for creating getter/setter methods, @staticmethod for methods that don't need instance or class access, @classmethod for methods that receive the class as the first argument, and @functools.wraps for preserving function metadata when creating custom decorators. Custom decorators can be simple functions or more complex callable objects. For example, a timing decorator might measure execution time, while a retry decorator could automatically retry failed operations. Decorators can also accept parameters, creating decorator factories that return customized decorators.

Advanced decorator patterns include class decorators (which modify entire classes), decorator stacking (applying multiple decorators to one function), and context-aware decorators that modify behavior based on runtime conditions. The functools module provides tools like @lru_cache for memoization and @singledispatch for creating generic functions. Understanding decorators opens doors to metaprogramming - writing code that manipulates code - and is essential for working with frameworks like Flask, Django, and many testing libraries that rely heavily on decorator patterns.`,
  },
  {
    slug: 'context-managers',
    title: 'Context Managers and Resource Management',
    description: 'Custom context managers and the with statement.',
    prompt: 'What method must a context manager implement to handle entry?',
    rule: { type: "equals", value: "__enter__" },
    hint: 'Dunder method for entering context.',
    lesson: `Context managers provide a robust protocol for resource management, ensuring that setup and cleanup operations are performed reliably even when exceptions occur. The context manager protocol requires two special methods: __enter__ is called when entering the 'with' block and can return a value that gets assigned to the variable after 'as', while __exit__ is called when leaving the block (normally or due to an exception) and receives information about any exception that occurred. This pattern guarantees that cleanup code runs regardless of how the block exits, making it perfect for managing files, database connections, locks, and other resources.

Creating custom context managers can be done in two ways: by implementing a class with __enter__ and __exit__ methods, or by using the @contextlib.contextmanager decorator with a generator function. The decorator approach is often simpler - you yield the resource at the point where __enter__ would return it, and any code after the yield acts as cleanup (equivalent to __exit__). For example, a database transaction context manager might begin a transaction in the setup, yield the connection, and commit or rollback in the cleanup based on whether an exception occurred.

Advanced context manager patterns include nested context managers, reentrant context managers (that can be entered multiple times), and asynchronous context managers (using __aenter__ and __aexit__ for async/await code). The contextlib module provides utilities like ExitStack for managing multiple context managers dynamically, suppress for ignoring specific exceptions, and closing for ensuring objects get closed. Understanding context managers is crucial for writing robust Python code that properly manages resources and handles errors gracefully.`,
  },
  {
    slug: 'iterators-generators',
    title: 'Iterators and Generators',
    description: 'Custom iterators and generator functions for memory efficiency.',
    prompt: 'What keyword creates a generator function?',
    rule: { type: "equalsCaseInsensitive", value: "yield" },
    hint: 'Produces values one at a time.',
    lesson: `Iterators and generators are fundamental to Python's approach to handling sequences and data streams efficiently. An iterator is any object that implements the iterator protocol by defining __iter__ (returns self) and __next__ (returns the next value or raises StopIteration). This protocol enables objects to work with for loops, list comprehensions, and other iteration contexts. However, creating custom iterators by implementing these methods can be verbose and error-prone, which is where generators provide an elegant solution.

Generators are functions that use the 'yield' keyword instead of 'return', automatically creating iterator objects with much less boilerplate code. When a generator function is called, it returns a generator object without executing the function body. Each call to next() (or iteration in a loop) executes the function until it hits a yield statement, which produces a value and pauses execution. The function resumes from that exact point on the next iteration, maintaining local variables and execution state. This lazy evaluation makes generators extremely memory-efficient for large datasets or infinite sequences.

Advanced generator features include yield from for delegating to sub-generators, generator expressions for concise one-liners, and the ability to send values back into generators using the send() method. Generators are perfect for data pipelines, file processing, mathematical sequences, and any scenario where you need to process large amounts of data without loading everything into memory. The itertools module provides many useful functions for working with iterators and generators, enabling powerful functional programming patterns for data transformation and analysis.`,
  },
  {
    slug: 'lambda-functional',
    title: 'Lambda Functions and Functional Programming',
    description: 'Anonymous functions and functional programming concepts.',
    prompt: 'What keyword creates an anonymous function?',
    rule: { type: "equalsCaseInsensitive", value: "lambda" },
    hint: 'Greek letter, anonymous functions.',
    lesson: `Lambda functions are Python's way of creating small, anonymous functions inline without the formal function definition syntax. The lambda keyword creates a function expression that can take arguments and return a single expression's result. For example, lambda x: x*2 creates a function that doubles its input, equivalent to def double(x): return x*2 but more concise for simple operations. Lambda functions are particularly useful as arguments to higher-order functions like map(), filter(), and sort(), where you need a simple transformation function without the overhead of a full function definition.

Functional programming concepts complement lambda functions by treating functions as first-class objects that can be passed around, stored in variables, and used as arguments. The map() function applies a function to every item in an iterable: map(lambda x: x**2, numbers) squares each number. The filter() function selects items based on a condition: filter(lambda x: x > 0, numbers) keeps only positive numbers. The reduce() function (from functools) applies a function cumulatively to reduce a sequence to a single value.

While lambda functions are powerful for simple operations, they're limited to single expressions and can hurt readability when overused. Python's list comprehensions often provide a more readable alternative to map() and filter() with lambda functions. The key is knowing when to use each approach: lambda for simple transformations in functional contexts, regular functions for complex logic, and comprehensions for readable data transformations. Understanding functional programming concepts enhances your ability to write clean, expressive Python code.`,
  },
  {
    slug: 'collections-module',
    title: 'Collections Module and Data Structures',
    description: 'Specialized data structures from the collections module.',
    prompt: 'What collections class counts hashable objects?',
    rule: { type: "equalsCaseInsensitive", value: "Counter" },
    hint: 'Counts occurrences of elements.',
    lesson: `The collections module provides specialized container datatypes that extend Python's built-in containers (dict, list, set, tuple) with additional functionality for specific use cases. These high-performance alternatives solve common programming problems more elegantly and efficiently than using basic data structures. Counter is perhaps the most immediately useful - it's a dict subclass designed for counting hashable objects, automatically handling the common pattern of counting occurrences. Counter('hello') returns Counter({'l': 2, 'h': 1, 'e': 1, 'o': 1}), and it provides methods like most_common() for finding the most frequent elements.

Other essential collections include defaultdict, which automatically creates missing values using a factory function (eliminating KeyError exceptions), namedtuple for creating simple classes with named fields, and deque (double-ended queue) for efficient appends and pops from both ends. OrderedDict maintains insertion order (though regular dicts do this in Python 3.7+), while ChainMap groups multiple dicts into a single view. Each collection is optimized for specific patterns: defaultdict for grouping data, namedtuple for lightweight data containers, and deque for queues and stacks.

These specialized collections often replace multiple lines of boilerplate code with single, clear statements. For example, defaultdict(list) eliminates the need to check if keys exist before appending to lists, while namedtuple creates immutable objects with named access that are more memory-efficient than classes. Understanding when and how to use these collections leads to more readable, efficient code and demonstrates Python expertise. They're particularly valuable in data processing, algorithm implementation, and any scenario where you're working extensively with structured data.`,
  },
  {
    slug: 'regex-advanced',
    title: 'Regular Expressions and Pattern Matching',
    description: 'Advanced regex patterns and text processing.',
    prompt: 'What regex quantifier means "one or more"?',
    rule: { type: "equals", value: "+" },
    hint: 'Plus sign.',
    lesson: `Regular expressions (regex) provide a powerful, concise language for pattern matching and text manipulation that goes far beyond simple string methods. Quantifiers control how many times a pattern element should match: + means one or more, * means zero or more, ? means zero or one (optional), and {n,m} specifies a range from n to m occurrences. These quantifiers can be applied to individual characters, character classes [a-z], or groups (pattern). Understanding quantifiers is essential for creating flexible patterns that match varying amounts of text while maintaining precision.

Advanced regex features include character classes (\d for digits, \w for word characters, \s for whitespace), anchors (^ for start of string, $ for end), and groups for capturing or organizing patterns. Lookahead (?=pattern) and lookbehind (?<=pattern) assertions allow you to match based on context without including the context in the match. Non-capturing groups (?:pattern) organize patterns without creating capture groups, while named groups (?P<name>pattern) provide readable access to captured text. These features enable sophisticated pattern matching for tasks like email validation, log parsing, and data extraction.

Best practices for regex include using raw strings (r"pattern") to avoid escaping issues, compiling frequently-used patterns for performance, and testing patterns thoroughly with edge cases. While regex is powerful, it's not always the best solution - simple string methods are often more readable for basic operations, and specialized parsers may be better for complex structured data. The key is recognizing when regex provides the right balance of power and maintainability for your text processing needs.`,
  },
  {
    slug: 'testing-advanced',
    title: 'Advanced Testing and TDD',
    description: 'Test-driven development, mocking, and testing strategies.',
    prompt: 'What testing framework is more concise than unittest?',
    rule: { type: "equalsCaseInsensitive", value: "pytest" },
    hint: 'Popular third-party testing framework.',
    lesson: `Advanced testing strategies go beyond basic unit tests to encompass comprehensive testing approaches that ensure code quality, maintainability, and reliability. Pytest is a powerful testing framework that offers more concise syntax than unittest, with features like automatic test discovery, detailed assertion introspection, and a rich ecosystem of plugins. Pytest fixtures provide a clean way to set up test data and resources, while parametrized tests allow running the same test with multiple input values, reducing code duplication and improving test coverage.

Test-Driven Development (TDD) follows the Red-Green-Refactor cycle: write a failing test (Red), implement the minimum code to make it pass (Green), then improve the code while keeping tests passing (Refactor). This approach leads to better-designed, more testable code and ensures comprehensive test coverage. Mocking is essential for testing components in isolation by replacing dependencies with controlled mock objects using libraries like unittest.mock or pytest-mock. This enables testing of complex interactions without relying on external services or slow operations.

Comprehensive testing strategies include unit tests for individual functions, integration tests for component interactions, and end-to-end tests for complete user workflows. Code coverage tools help identify untested code paths, while continuous integration ensures tests run automatically on code changes. Best practices include writing tests that are fast, independent, repeatable, and focused on behavior rather than implementation details. Understanding these advanced testing concepts is crucial for building robust, maintainable applications that can evolve safely over time.`,
  },
  {
    slug: 'datetime-handling',
    title: 'Date and Time Handling',
    description: 'Working with dates, times, and timezones.',
    prompt: 'What module provides date and time functionality?',
    rule: { type: "equalsCaseInsensitive", value: "datetime" },
    hint: 'Same as the class name.',
    lesson: `Date and time handling is crucial for most real-world applications, from logging events and scheduling tasks to analyzing time-series data and managing user interactions across different time zones. Python's datetime module provides a comprehensive set of classes for working with dates and times: date for calendar dates, time for time of day, datetime for combined date and time, and timedelta for representing durations. The datetime.now() function returns the current local date and time, while datetime.utcnow() provides UTC time, though timezone-aware operations are generally preferred.

Working with different time zones requires careful consideration to avoid bugs and ensure accurate time calculations. The pytz library (or the newer zoneinfo module in Python 3.9+) provides timezone support, allowing you to create timezone-aware datetime objects and convert between different zones. Best practices include storing times in UTC and converting to local time for display, using timezone-aware datetime objects consistently, and being explicit about timezone assumptions. The strftime() method formats datetime objects as strings, while strptime() parses strings into datetime objects using format codes.

Common datetime operations include calculating time differences using timedelta objects, parsing and formatting dates from various sources, and handling recurring events or schedules. The calendar module complements datetime for calendar-related operations, while libraries like dateutil provide more flexible parsing and timezone handling. Understanding datetime handling is essential for building applications that deal with scheduling, logging, data analysis, or any time-sensitive functionality, especially in global applications serving users across multiple time zones.`,
  },
  {
    slug: 'json-apis',
    title: 'JSON and API Integration',
    description: 'Working with JSON data and REST APIs.',
    prompt: 'What method converts a Python object to JSON string?',
    rule: { type: "equalsCaseInsensitive", value: "dumps" },
    hint: 'Dump string.',
    lesson: `JSON (JavaScript Object Notation) has become the standard format for data exchange between applications, APIs, and web services due to its simplicity and language-agnostic nature. Python's built-in json module provides seamless conversion between Python objects and JSON strings: json.dumps() serializes Python objects (dicts, lists, strings, numbers, booleans) to JSON strings, while json.loads() deserializes JSON strings back to Python objects. For file operations, json.dump() writes directly to files and json.load() reads from files, eliminating the need for separate file handling and string conversion.

API integration typically involves making HTTP requests to retrieve or send JSON data, commonly using the requests library for its simplicity and powerful features. A typical API workflow includes making GET requests to retrieve data, POST requests to create resources, PUT/PATCH for updates, and DELETE for removal. Proper error handling is crucial - checking response status codes, handling network timeouts, and gracefully managing API rate limits. Authentication methods vary from simple API keys to OAuth tokens, and many APIs require specific headers like Content-Type: application/json for JSON payloads.

Best practices for JSON and API work include validating data structure before processing, handling missing or unexpected fields gracefully, implementing retry logic for transient failures, and respecting API rate limits and terms of service. When working with complex APIs, consider using libraries like requests-oauthlib for OAuth authentication or specialized SDK libraries when available. Understanding JSON serialization and API integration is fundamental for modern Python development, enabling applications to communicate with databases, web services, and third-party platforms effectively.`,
  },
  {
    slug: 'logging',
    title: 'Logging and Application Monitoring',
    description: 'Structured logging for application debugging and monitoring.',
    prompt: 'What module provides logging functionality?',
    rule: { type: "equalsCaseInsensitive", value: "logging" },
    hint: 'Built-in logging module.',
    lesson: `Logging is a critical aspect of application development, enabling developers to monitor application behavior, diagnose issues, and understand performance characteristics. Python's built-in logging module provides a flexible and customizable logging system that can be configured to meet the needs of various applications. The logging module supports different log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL) that can be used to categorize log messages based on their severity.

The logging module can be configured using a configuration file or programmatically using the logging.config module. Log messages can be formatted using various formatters, such as the Formatter class, to include information like the timestamp, log level, and message text. Handlers can be used to control where log messages are sent, such as to a file, console, or network socket. Best practices for logging include using meaningful log messages, configuring logging levels appropriately, and using handlers to manage log output.`,
  },
  {
    slug: 'advanced-oop',
    title: 'Advanced OOP - Inheritance and Polymorphism',
    description: 'Class inheritance, method overriding, and polymorphism.',
    prompt: 'What keyword is used for class inheritance?',
    rule: { type: "includesAny", value: ["class Child(Parent)", "parentheses", "()"] },
    hint: 'Specify parent class in parentheses.',
    lesson: `Inheritance is a fundamental object-oriented programming concept that allows classes to inherit attributes and methods from parent classes, promoting code reuse and establishing hierarchical relationships between related classes. In Python, inheritance is specified by placing the parent class name in parentheses after the child class name: class Child(Parent). The child class automatically gains access to all public methods and attributes of the parent class, and can add new functionality or override existing behavior. This creates an "is-a" relationship where a Child object is also a Parent object, enabling polymorphic behavior.

Method overriding allows child classes to provide specific implementations of methods defined in parent classes, while the super() function enables access to parent class methods from within child classes. This is particularly useful when you want to extend rather than completely replace parent functionality: super().__init__() calls the parent constructor, then you can add child-specific initialization. Python supports multiple inheritance, where a class can inherit from multiple parent classes, though this should be used carefully to avoid complexity and ambiguity. The Method Resolution Order (MRO) determines which method gets called in complex inheritance hierarchies.

Polymorphism allows objects of different classes to be treated uniformly through a common interface, typically achieved through inheritance or duck typing. For example, different shape classes (Circle, Rectangle, Triangle) can all implement a draw() method, allowing code to call draw() on any shape object without knowing its specific type. Abstract base classes (using the abc module) can define interfaces that subclasses must implement, ensuring consistent APIs across related classes. Understanding inheritance and polymorphism is crucial for designing flexible, maintainable object-oriented systems that can evolve and scale effectively.`,
  },
  {
    slug: 'api-development',
    title: 'RESTful APIs and Web Services',
    description: 'Creating and consuming REST APIs and web services.',
    prompt: 'What HTTP method is used to retrieve data?',
    rule: { type: "equalsCaseInsensitive", value: "GET" },
    hint: 'Method to get/retrieve data.',
    lesson: `RESTful APIs (Representational State Transfer) provide a standardized approach to building web services that are scalable, maintainable, and easy to understand. REST APIs use standard HTTP methods to perform operations on resources: GET for retrieving data, POST for creating new resources, PUT for updating existing resources, and DELETE for removing resources. Each resource is identified by a URL, and the API returns appropriate HTTP status codes (200 for success, 404 for not found, 500 for server errors) along with data typically formatted as JSON.

Designing effective REST APIs involves following conventions like using nouns for resource names (/users, /posts), implementing proper HTTP status codes, supporting pagination for large datasets, and providing clear error messages. Authentication and authorization are crucial considerations, with options ranging from API keys and JWT tokens to OAuth 2.0 for more complex scenarios. API versioning strategies help maintain backward compatibility as APIs evolve, while rate limiting prevents abuse and ensures fair usage.

Modern API development also involves considerations like CORS for cross-origin requests, comprehensive documentation (often using tools like Swagger/OpenAPI), testing strategies for both unit and integration tests, and monitoring for performance and reliability. Frameworks like FastAPI, Flask-RESTful, and Django REST Framework provide tools and conventions for building robust APIs quickly. Understanding REST principles and best practices is essential for building services that integrate well with other systems and provide reliable interfaces for client applications.`,
  },
  {
    slug: 'data-analysis',
    title: 'Data Analysis with Pandas',
    description: 'Data manipulation and analysis using pandas library.',
    prompt: 'What pandas object represents a 2D data structure?',
    rule: { type: "equalsCaseInsensitive", value: "DataFrame" },
    hint: 'Frame of data.',
    lesson: `Data analysis with pandas revolutionizes how Python developers work with structured data, providing powerful tools for data manipulation, cleaning, and analysis. The DataFrame is pandas' primary 2D data structure, similar to a spreadsheet or SQL table, with labeled rows and columns that can hold different data types. Series represents 1D labeled arrays, often used for individual columns or rows. Together, these structures enable intuitive data operations using familiar syntax like df['column'] for selection and df.groupby('category').mean() for aggregation.

Pandas excels at data input/output with functions like read_csv(), read_excel(), and read_json() for loading data from various sources, plus corresponding write functions for output. Data manipulation operations include filtering with boolean indexing, merging datasets with merge() and join(), reshaping data with pivot() and melt(), and handling missing data with fillna() and dropna(). The groupby() operation enables split-apply-combine workflows for aggregating data by categories, while vectorized operations make computations fast and efficient.

Advanced pandas features include time series analysis with datetime indexing, categorical data handling for memory efficiency, and integration with visualization libraries like matplotlib and seaborn. Best practices include using vectorized operations instead of loops, leveraging method chaining for readable data pipelines, and understanding when to use copy() versus views. Pandas forms the foundation of the Python data science ecosystem and is essential for anyone working with structured data, from simple CSV files to complex analytical workflows.`,
  },
  {
    slug: 'scientific-computing',
    title: 'Scientific Computing with NumPy',
    description: 'Numerical computing and array operations with NumPy.',
    prompt: 'What is the main data structure in NumPy?',
    rule: { type: "equalsCaseInsensitive", value: "array" },
    hint: 'N-dimensional array structure.',
    lesson: `NumPy (Numerical Python) is the foundation of scientific computing in Python, providing efficient operations on large, multi-dimensional arrays and matrices. The numpy.array() function creates n-dimensional arrays (ndarrays) that are much faster than Python lists for numerical operations due to their homogeneous data types and optimized C implementations. NumPy arrays support vectorized operations, allowing you to perform mathematical operations on entire arrays without explicit loops, making code both faster and more readable.

Key NumPy features include broadcasting, which enables operations between arrays of different shapes by automatically expanding smaller arrays to match larger ones, and a comprehensive collection of mathematical functions for trigonometry, statistics, linear algebra, and more. Array indexing and slicing provide powerful ways to access and modify data, while functions like reshape(), transpose(), and concatenate() enable flexible data manipulation. NumPy's random module generates random numbers and samples from various probability distributions, essential for simulations and statistical analysis.

NumPy serves as the foundation for the entire Python scientific computing ecosystem, with libraries like pandas, scikit-learn, and matplotlib all built on NumPy arrays. Understanding NumPy is crucial for data science, machine learning, image processing, and any application requiring efficient numerical computation. Best practices include using vectorized operations instead of loops, understanding memory layout for performance optimization, and leveraging NumPy's extensive function library rather than reimplementing mathematical operations.`,
  },
  {
    slug: 'performance-optimization',
    title: 'Performance Optimization and Profiling',
    description: 'Code optimization techniques and performance profiling.',
    prompt: 'What module provides performance profiling in Python?',
    rule: { type: "equalsCaseInsensitive", value: "cProfile" },
    hint: 'C-based profiler.',
    lesson: `Performance optimization begins with measurement and profiling to identify actual bottlenecks rather than premature optimization based on assumptions. Python's cProfile module provides detailed function-level profiling, showing execution time, call counts, and cumulative time for each function. The timeit module offers precise timing for small code snippets, while memory profilers like memory_profiler help identify memory usage patterns. Line profilers can pinpoint exact lines causing performance issues, and tools like py-spy provide sampling profilers for production environments.

Optimization strategies range from algorithmic improvements (choosing better algorithms and data structures) to implementation-level optimizations like using list comprehensions instead of loops, leveraging built-in functions, and minimizing object creation. Data structure choice significantly impacts performance: sets for membership testing, deques for queue operations, and dictionaries for lookups. For CPU-intensive tasks, consider NumPy for numerical operations, multiprocessing for parallel execution, or even Cython for near-C performance on critical code paths.

Modern Python performance optimization also involves understanding the Global Interpreter Lock (GIL) and when to use threading versus multiprocessing, implementing caching strategies with functools.lru_cache or external caches like Redis, and optimizing database queries and I/O operations. Monitoring tools help track performance in production, while load testing ensures applications perform well under realistic conditions. The key principle is to measure first, optimize the biggest bottlenecks, and maintain code readability while improving performance.`,
  },
  {
    slug: 'packaging-deployment',
    title: 'Package Management and Deployment',
    description: 'Creating packages, virtual environments, and deployment.',
    prompt: 'What file specifies package dependencies?',
    rule: { type: "equals", value: "requirements.txt" },
    hint: 'Text file listing requirements.',
    lesson: `Package management and deployment are crucial skills for distributing Python applications and managing dependencies effectively. The requirements.txt file serves as the standard way to specify project dependencies, listing package names and versions that can be installed with 'pip install -r requirements.txt'. Virtual environments, created with venv or virtualenv, provide isolated Python environments that prevent dependency conflicts between projects. This isolation ensures that each project can use specific package versions without affecting system-wide installations or other projects.

Modern Python packaging uses pyproject.toml as the configuration file, following PEP 518 standards, though setup.py is still widely used for backward compatibility. These files define package metadata, dependencies, entry points, and build requirements. Tools like setuptools, wheel, and build help create distributable packages, while twine uploads packages to PyPI (Python Package Index). Understanding semantic versioning helps manage package updates and compatibility, while dependency pinning strategies balance stability with security updates.

Deployment strategies vary from simple script distribution to containerized applications using Docker, cloud platforms like AWS Lambda or Google Cloud Functions, and traditional server deployments. CI/CD pipelines automate testing, building, and deployment processes, ensuring code quality and reliable releases. Best practices include using virtual environments for development, pinning dependencies for reproducible builds, following semantic versioning for releases, and implementing proper testing before deployment. These skills are essential for professional Python development and collaborative software projects.`,
  },
];

// Level 4 - Professional Python Development
const level4Courses: Course[] = [
  {
    slug: 'design-patterns',
    title: 'Design Patterns and Architecture',
    description: 'Common design patterns and architectural principles.',
    prompt: 'What pattern ensures only one instance of a class exists?',
    rule: { type: "equalsCaseInsensitive", value: "Singleton" },
    hint: 'Single instance pattern.',
    lesson: `Design patterns are reusable solutions to common programming problems that provide proven approaches to software architecture and code organization. They represent best practices developed by experienced programmers and help create more maintainable, flexible, and understandable code. The Singleton pattern ensures that a class has only one instance throughout the application's lifetime, useful for managing shared resources like database connections or configuration settings. In Python, Singleton can be implemented by overriding the __new__ method to control instance creation, though alternatives like module-level variables or dependency injection are often more Pythonic.

Other essential design patterns include the Factory pattern for creating objects without specifying exact classes, the Observer pattern for implementing event-driven architectures where objects notify dependents of state changes, and the Strategy pattern for defining interchangeable algorithms. The Decorator pattern (different from Python's @ decorators) adds behavior to objects dynamically, while the Adapter pattern allows incompatible interfaces to work together. Each pattern addresses specific design challenges and promotes principles like loose coupling, single responsibility, and open/closed design.

Understanding design patterns helps developers communicate more effectively using established terminology and avoid reinventing solutions to common problems. However, patterns should be applied judiciously - overuse can lead to unnecessarily complex code. The key is recognizing when a pattern genuinely improves code structure versus when simpler solutions suffice. Modern Python development often favors composition over inheritance, dependency injection over singletons, and functional approaches over complex object hierarchies, but classical patterns remain valuable tools in a developer's toolkit.`,
  },
  {
    slug: 'async-programming',
    title: 'Asynchronous Programming',
    description: 'Async/await, coroutines, and concurrent programming.',
    prompt: 'What keyword defines an asynchronous function?',
    rule: { type: "equalsCaseInsensitive", value: "async" },
    hint: 'Asynchronous function definition.',
    lesson: `Asynchronous programming enables applications to handle multiple operations concurrently without blocking execution, making it essential for I/O-intensive tasks like web requests, file operations, and database queries. Python's async/await syntax provides a clean, readable way to write asynchronous code that looks similar to synchronous code but runs concurrently. An async function is defined with 'async def' and can contain 'await' expressions that pause execution until the awaited operation completes, allowing other coroutines to run in the meantime.

The asyncio module provides the foundation for asynchronous programming in Python, including event loops that manage and execute coroutines, tasks for concurrent execution, and utilities for synchronization and communication between async operations. Common patterns include using asyncio.gather() to run multiple coroutines concurrently, asyncio.create_task() to schedule coroutines for execution, and async context managers for resource management. Libraries like aiohttp for HTTP requests and aiofiles for file I/O provide async alternatives to their synchronous counterparts.

Asynchronous programming is particularly valuable for web applications, API clients, and any application that performs many I/O operations. However, it's important to understand that async code doesn't automatically make CPU-bound tasks faster - it's designed for I/O-bound concurrency. Common pitfalls include mixing blocking and non-blocking code, not properly awaiting coroutines, and overcomplicating simple synchronous operations. Understanding when and how to use async programming effectively can dramatically improve application performance and responsiveness.`,
  },
  {
    slug: 'database-integration',
    title: 'Database Integration and ORMs',
    description: 'Working with databases using SQLAlchemy and other ORMs.',
    prompt: 'What does ORM stand for? (first word)',
    rule: { type: "equalsCaseInsensitive", value: "Object" },
    hint: 'Object-___ Mapping.',
    lesson: `Object-Relational Mapping (ORM) bridges the gap between object-oriented programming and relational databases by allowing developers to work with database records as Python objects rather than writing raw SQL queries. ORMs like SQLAlchemy provide a high-level abstraction that maps database tables to Python classes, rows to object instances, and columns to object attributes. This approach reduces boilerplate code, improves code maintainability, and helps prevent SQL injection attacks by automatically handling query parameterization.

SQLAlchemy, Python's most popular ORM, offers both a Core layer for expression-based SQL generation and an ORM layer for object-relational mapping. The ORM uses declarative base classes to define models that correspond to database tables, with relationships between tables expressed as object attributes. SQLAlchemy handles complex operations like lazy loading of related objects, automatic transaction management, and connection pooling. Other ORMs like Django's built-in ORM, Peewee, and Tortoise ORM offer different approaches and feature sets for various use cases.

Best practices for ORM usage include understanding the underlying SQL being generated, using eager loading to avoid N+1 query problems, properly managing database sessions and transactions, and knowing when to drop down to raw SQL for complex queries. While ORMs provide many benefits, they can also introduce performance overhead and complexity. The key is finding the right balance between developer productivity and application performance, sometimes using ORMs for most operations while optimizing critical paths with hand-tuned SQL queries.`,
  },
  {
    slug: 'web-frameworks',
    title: 'Web Development with Flask/Django',
    description: 'Building web applications with Python frameworks.',
    prompt: 'What decorator creates a route in Flask?',
    rule: { type: "equals", value: "@app.route" },
    hint: 'App route decorator.',
    lesson: `Python web frameworks provide the foundation for building web applications, handling HTTP requests and responses, URL routing, template rendering, and database integration. Flask is a lightweight, flexible microframework that gives developers fine-grained control over application architecture. The @app.route() decorator maps URL patterns to Python functions, making it easy to define endpoints. Flask's minimalist approach means you choose your own tools for databases, authentication, and other features, making it ideal for small to medium applications or when you need maximum flexibility.

Django, in contrast, is a "batteries-included" framework that provides a comprehensive set of built-in features including an ORM, admin interface, authentication system, and templating engine. Django follows the Model-View-Template (MVT) pattern and emphasizes convention over configuration, making it excellent for rapid development of complex applications. Django's built-in features like automatic admin interfaces, robust security features, and scalable architecture make it popular for large-scale web applications and content management systems.

Choosing between frameworks depends on project requirements: Flask for maximum control and simplicity, Django for rapid development with built-in features, or alternatives like FastAPI for high-performance APIs. Modern web development also involves understanding concepts like RESTful APIs, authentication and authorization, database migrations, static file serving, and deployment strategies. Both frameworks support these concepts but with different approaches and levels of built-in support.`,
  },
];

// Level 5 - Expert Python and Specialized Applications
const level5Courses: Course[] = [
  {
    slug: 'machine-learning',
    title: 'Machine Learning with Scikit-learn',
    description: 'Introduction to machine learning algorithms and scikit-learn.',
    prompt: 'What scikit-learn method splits data into training and test sets?',
    rule: { type: "equals", value: "train_test_split" },
    hint: 'Function that splits training and test data.',
    lesson: `Machine learning with scikit-learn democratizes access to powerful algorithms for classification, regression, clustering, and dimensionality reduction. The train_test_split function is fundamental to machine learning workflows, randomly dividing datasets into training and testing portions to evaluate model performance on unseen data. This separation prevents overfitting and provides realistic performance estimates. Scikit-learn's consistent API follows the fit(), predict(), score() pattern across all algorithms, making it easy to experiment with different models using the same code structure.

Scikit-learn provides a comprehensive toolkit including preprocessing utilities for scaling, encoding, and transforming data, feature selection methods for identifying relevant variables, and model evaluation metrics for assessing performance. Popular algorithms include linear regression, logistic regression, decision trees, random forests, support vector machines, and k-means clustering. The library also offers tools for hyperparameter tuning through grid search and cross-validation, enabling systematic optimization of model performance.

Best practices in machine learning include proper data preprocessing, feature engineering, cross-validation for robust evaluation, and understanding the bias-variance tradeoff. Scikit-learn integrates seamlessly with pandas for data manipulation and matplotlib for visualization, forming a complete machine learning pipeline. Understanding these fundamentals is essential for data science, predictive analytics, and building intelligent applications that can learn from data and make predictions or classifications.`,
  },
  {
    slug: 'deep-learning',
    title: 'Deep Learning Fundamentals',
    description: 'Neural networks and deep learning with TensorFlow/PyTorch.',
    prompt: 'What is the basic building block of neural networks?',
    rule: { type: "equalsCaseInsensitive", value: "neuron" },
    hint: 'Basic unit that processes information.',
    lesson: `Deep learning represents a revolutionary approach to machine learning that uses artificial neural networks with multiple layers to automatically learn complex patterns from data. The neuron (or node) is the fundamental building block of neural networks, inspired by biological neurons. Each artificial neuron receives inputs, applies weights and a bias, passes the result through an activation function, and produces an output. When organized into layers and networks, these simple units can learn incredibly complex representations and solve problems that were previously impossible for traditional algorithms.

Modern deep learning frameworks like TensorFlow and PyTorch provide high-level APIs for building, training, and deploying neural networks. These frameworks handle automatic differentiation (computing gradients for backpropagation), GPU acceleration for fast computation, and distributed training across multiple machines. Common architectures include feedforward networks for basic classification, convolutional neural networks (CNNs) for image processing, recurrent neural networks (RNNs) for sequential data, and transformers for natural language processing.

Deep learning has achieved breakthrough results in computer vision, natural language processing, speech recognition, game playing, and many other domains. However, it requires large amounts of data, significant computational resources, and careful hyperparameter tuning. Best practices include proper data preprocessing, regularization techniques to prevent overfitting, transfer learning to leverage pre-trained models, and understanding when deep learning is appropriate versus simpler machine learning approaches. The field continues to evolve rapidly with new architectures and techniques constantly emerging.`,
  },
  {
    slug: 'computer-vision',
    title: 'Computer Vision with OpenCV',
    description: 'Image processing and computer vision applications.',
    prompt: 'What library is commonly used for computer vision in Python?',
    rule: { type: "equalsCaseInsensitive", value: "OpenCV" },
    hint: 'Open source computer vision library.',
    lesson: `Computer vision with OpenCV opens up a world of possibilities for analyzing and processing visual information, from simple image manipulation to complex object detection and recognition systems. OpenCV (Open Source Computer Vision Library) provides comprehensive tools for image and video processing, including functions for loading, saving, and displaying images, applying various filters and transformations, and extracting meaningful information from visual data. The library's Python bindings (cv2) make it accessible to Python developers while maintaining the performance of the underlying C++ implementation.

Core computer vision operations include image filtering for noise reduction and enhancement, edge detection for identifying object boundaries, feature detection and matching for object recognition, and morphological operations for shape analysis. OpenCV supports various color spaces, geometric transformations, and advanced techniques like histogram analysis, template matching, and contour detection. The library also provides machine learning algorithms specifically designed for computer vision tasks, including face detection, object tracking, and optical flow analysis.

Modern computer vision applications span numerous domains: medical imaging for diagnostic assistance, autonomous vehicles for navigation and safety, security systems for surveillance and access control, augmented reality for interactive experiences, and industrial automation for quality control. OpenCV integrates well with deep learning frameworks, enabling hybrid approaches that combine traditional computer vision techniques with neural networks. Understanding computer vision fundamentals is crucial for developing applications that can interpret and understand visual information in the real world.`,
  },
  {
    slug: 'natural-language',
    title: 'Natural Language Processing',
    description: 'Text processing and NLP with NLTK and spaCy.',
    prompt: 'What does NLP stand for? (first word)',
    rule: { type: "equalsCaseInsensitive", value: "Natural" },
    hint: 'Natural ___ Processing.',
    lesson: `Natural Language Processing (NLP) enables computers to understand, interpret, and generate human language, bridging the gap between human communication and machine understanding. NLP combines computational linguistics with machine learning and deep learning to process text and speech data. Core NLP tasks include tokenization (breaking text into words or sentences), part-of-speech tagging (identifying grammatical roles), named entity recognition (finding people, places, organizations), sentiment analysis (determining emotional tone), and language translation. These foundational techniques enable more complex applications like chatbots, document summarization, and question-answering systems.

Python offers excellent NLP libraries: NLTK provides comprehensive tools for educational and research purposes, spaCy offers industrial-strength processing with pre-trained models, and transformers library gives access to state-of-the-art models like BERT and GPT. These libraries handle preprocessing tasks like stemming and lemmatization, provide pre-trained models for various languages, and offer APIs for common NLP operations. Modern NLP increasingly relies on transformer architectures and large language models that can understand context and generate human-like text.

NLP applications span numerous domains: customer service chatbots, content recommendation systems, automated translation services, social media monitoring, legal document analysis, and medical text processing. Best practices include proper text preprocessing, handling multiple languages and encodings, understanding bias in language models, and choosing appropriate evaluation metrics. As NLP technology rapidly advances with large language models, understanding these fundamentals becomes increasingly important for building applications that can effectively process and understand human language.`,
  },
  {
    slug: 'web-scraping',
    title: 'Web Scraping and Automation',
    description: 'Extracting data from websites and web automation.',
    prompt: 'What library is popular for web scraping in Python?',
    rule: { type: "equalsCaseInsensitive", value: "BeautifulSoup" },
    hint: 'Beautiful library for parsing HTML.',
    lesson: `Web scraping enables automated extraction of data from websites, transforming unstructured web content into structured data for analysis, monitoring, or integration into applications. BeautifulSoup is the most popular Python library for parsing HTML and XML documents, providing intuitive methods for navigating and searching the document tree using CSS selectors or tag-based queries. Combined with the requests library for HTTP communication, this duo handles most web scraping tasks effectively, from simple data extraction to complex form submissions and session management.

For JavaScript-heavy websites that load content dynamically, Selenium provides browser automation capabilities by controlling actual web browsers like Chrome or Firefox. This allows scraping of content that's generated client-side and interaction with dynamic elements like dropdown menus, buttons, and forms. Advanced scraping techniques include handling anti-scraping measures, rotating user agents and proxies, implementing delays and rate limiting, and managing cookies and sessions for authenticated content. For large-scale projects, Scrapy offers a comprehensive framework with built-in support for concurrent requests, data pipelines, and robust error handling.

Ethical web scraping requires respecting website terms of service, robots.txt files, and implementing appropriate delays to avoid overwhelming servers. Best practices include checking for APIs before scraping, caching responses to minimize requests, handling errors gracefully, and monitoring for changes in website structure. Web scraping applications range from price monitoring and market research to news aggregation and academic research, making it a valuable skill for data collection and automation in many domains.`,
  },
  {
    slug: 'gui-development',
    title: 'GUI Development with Tkinter',
    description: 'Creating desktop applications with graphical interfaces.',
    prompt: 'What is Python\'s standard GUI library?',
    rule: { type: "equalsCaseInsensitive", value: "Tkinter" },
    hint: 'Tk interface for Python.',
    lesson: `GUI development with Tkinter enables creation of desktop applications with graphical user interfaces, making Python programs more accessible and user-friendly. Tkinter (Tk interface) is Python's standard GUI library, included with most Python installations, providing widgets like windows, buttons, labels, text fields, and menus. The basic workflow involves creating a root window, adding widgets to it, configuring their properties and event handlers, and starting the main event loop that responds to user interactions. Layout managers like pack(), grid(), and place() control widget positioning and sizing within windows.

Tkinter offers a comprehensive set of widgets for building complete applications: Frame for organizing widgets, Label for displaying text or images, Button for user actions, Entry for text input, Text for multi-line text editing, Listbox for selections, Canvas for drawing and graphics, and Menu for application menus. Event handling connects user actions to Python functions, enabling interactive behavior. Advanced features include custom styling with themes, dialog boxes for user input, and integration with other Python libraries for data visualization or processing.

While modern alternatives like PyQt, wxPython, and web-based frameworks exist, Tkinter remains valuable for rapid prototyping, educational purposes, and simple desktop utilities. Best practices include separating GUI code from business logic, using object-oriented design for complex applications, and considering user experience principles like intuitive layouts and responsive feedback. Understanding GUI development concepts through Tkinter provides a foundation for building desktop applications and understanding user interface design principles.`,
  },
  {
    slug: 'network-programming',
    title: 'Network Programming and Sockets',
    description: 'Network communication and socket programming.',
    prompt: 'What module provides low-level network interface?',
    rule: { type: "equalsCaseInsensitive", value: "socket" },
    hint: 'Network socket module.',
    lesson: 'import socket for network programming. Create TCP/UDP connections, handle multiple clients.',
  },
  {
    slug: 'security-cryptography',
    title: 'Security and Cryptography',
    description: 'Implementing security measures and cryptographic functions.',
    prompt: 'What library provides cryptographic functions in Python?',
    rule: { type: "equalsCaseInsensitive", value: "cryptography" },
    hint: 'Library name matches the field.',
    lesson: 'from cryptography.fernet import Fernet for encryption. Hash passwords, secure communications.',
  },
  {
    slug: 'devops-automation',
    title: 'DevOps and Automation Scripts',
    description: 'Automation scripts for system administration and DevOps.',
    prompt: 'What module helps with operating system interface?',
    rule: { type: "equalsCaseInsensitive", value: "os" },
    hint: 'Two letters, operating system.',
    lesson: 'import os, subprocess, shutil for system operations. Automate deployments, file operations.',
  },
  {
    slug: 'microservices',
    title: 'Microservices and Distributed Systems',
    description: 'Building microservices and distributed applications.',
    prompt: 'What framework is popular for building microservices in Python?',
    rule: { type: "equalsCaseInsensitive", value: "FastAPI" },
    hint: 'Fast API framework.',
    lesson: 'FastAPI for high-performance APIs. Use Docker for containerization, message queues for communication.',
  },
];

export const levels: Level[] = [
  {
    id: 1,
    title: 'Level 1: Python Basics',
    description: 'Master the fundamentals of Python programming',
    courses: level1Courses,
    unlocked: true,
  },
  {
    id: 2,
    title: 'Level 2: Intermediate Foundations',
    description: 'Build on basics with intermediate Python concepts',
    courses: level2Courses,
    unlocked: false,
  },
  {
    id: 3,
    title: 'Level 3: Advanced Concepts',
    description: 'Explore advanced Python features and patterns',
    courses: level3Courses,
    unlocked: false,
  },
  {
    id: 4,
    title: 'Level 4: Professional Development',
    description: 'Professional Python development and frameworks',
    courses: level4Courses,
    unlocked: false,
  },
  {
    id: 5,
    title: 'Level 5: Expert Applications',
    description: 'Specialized applications and advanced domains',
    courses: level5Courses,
    unlocked: false,
  },
];

// Helper functions
export function getLevel(levelId: number): Level | undefined {
  return levels.find(level => level.id === levelId);
}

export function getCourse(levelId: number, courseSlug: string): Course | undefined {
  const level = getLevel(levelId);
  return level?.courses.find(course => course.slug === courseSlug);
}

export function getAllCourses(): Course[] {
  return levels.flatMap(level => level.courses);
}

export function isLevelUnlocked(levelId: number): boolean {
  if (levelId === 1) return true;
  
  // Check if previous level is completed
  const previousLevel = getLevel(levelId - 1);
  if (!previousLevel) return false;
  
  // Check if all courses in previous level are completed
  const completedCourses = getCompletedCourses();
  const previousLevelCourses = previousLevel.courses.map(c => `${levelId - 1}-${c.slug}`);
  
  return previousLevelCourses.every(courseKey => completedCourses.includes(courseKey));
}

export function getCompletedCourses(): string[] {
  if (typeof window === 'undefined') return [];
  const completed = localStorage.getItem('completedCourses');
  return completed ? JSON.parse(completed) : [];
}

export function markCourseCompleted(levelId: number, courseSlug: string): void {
  if (typeof window === 'undefined') return;
  
  const completed = getCompletedCourses();
  const courseKey = `${levelId}-${courseSlug}`;
  
  if (!completed.includes(courseKey)) {
    completed.push(courseKey);
    localStorage.setItem('completedCourses', JSON.stringify(completed));
  }
}

export function getLevelProgress(levelId: number): number {
  const level = getLevel(levelId);
  if (!level) return 0;
  
  const completed = getCompletedCourses();
  const levelCourses = level.courses.map(c => `${levelId}-${c.slug}`);
  const completedInLevel = levelCourses.filter(courseKey => completed.includes(courseKey));
  
  return Math.round((completedInLevel.length / levelCourses.length) * 100);
}
