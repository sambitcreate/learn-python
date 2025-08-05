export type Puzzle = {
  slug: string;
  title: string;
  description: string;
  prompt: string;
  placeholder?: string;
  // Instead of a function (which can't be serialized to the client safely in Next.js routing),
  // store a string-based rule and evaluate on the client.
  rule: { type: "equals" | "includesAny" | "equalsCaseInsensitive" | "keywordEQ"; value?: string | string[]; };
  hint?: string;
  lesson?: string;
};

export const puzzles: Puzzle[] = [
  {
    slug: 'intro',
    title: 'Intro: print()',
    description: 'Basics of printing text to the console.',
    prompt: 'What Python function prints text to the console?',
    placeholder: 'Type the exact function name...',
    rule: { type: "equals", value: "print" },
    hint: 'Try: print("Hello")',
    lesson:
      'In Python, print() outputs text or values. Example: print("Hi"). Parentheses are required in Python 3.',
  },
  {
    slug: 'comments',
    title: 'Comments',
    description: 'Single-line comments start with a special character.',
    prompt: 'Which character starts a single-line comment in Python?',
    rule: { type: "equals", value: "#" },
    hint: 'Common across many languages for quick notes.',
    lesson:
      'Use # to write a comment: # this is a comment. The interpreter ignores comments.',
  },
  {
    slug: 'variables',
    title: 'Variables',
    description: 'Dynamic typing and simple assignments.',
    prompt: 'Fill the blank to assign 42 to x: x ____ 42',
    placeholder: 'Enter the operator...',
    rule: { type: "equals", value: "=" },
    hint: 'One character.',
    lesson:
      'In Python, variables are created by assignment: x = 42. Types are inferred at runtime.',
  },
  {
    slug: 'strings',
    title: 'Strings',
    description: 'Quotes and concatenation.',
    prompt: 'Which quotes can define strings in Python? List any one of: __ or __',
    placeholder: 'Answer like: single quotes',
    rule: { type: "includesAny", value: ["single", "double"] },
    hint: 'Two common kinds.',
    lesson:
      'Strings can be defined with single quotes (\') or double quotes ("). Triple quotes support multi-line strings.',
  },
  {
    slug: 'fstrings',
    title: 'f-Strings',
    description: 'Interpolating expressions in strings.',
    prompt: 'What prefix enables string interpolation in Python 3.6+?',
    rule: { type: "equalsCaseInsensitive", value: "f" },
    hint: 'Like f"Hello {name}"',
    lesson:
      'f-Strings use f"..." and allow embedding expressions: name = "Ada"; print(f"Hi {name}").',
  },
  {
    slug: 'lists',
    title: 'Lists',
    description: 'Mutable ordered collections.',
    prompt: 'Which brackets define a list literal?',
    rule: { type: "includesAny", value: ["[]", "square"] },
    hint: 'They are square.',
    lesson:
      'Lists are created with square brackets: nums = [1, 2, 3]. They are mutable and ordered.',
  },
  {
    slug: 'dicts',
    title: 'Dictionaries',
    description: 'Key-value mappings.',
    prompt: 'Which braces define a dictionary literal?',
    rule: { type: "includesAny", value: ["{}", "curly"] },
    hint: 'They are curly.',
    lesson:
      'Dictionaries map keys to values: user = {"name": "Ada", "age": 36}. Access via user["name"].',
  },
  {
    slug: 'if',
    title: 'Conditions',
    description: 'Branching logic.',
    prompt: 'What keyword begins a conditional block?',
    rule: { type: "equalsCaseInsensitive", value: "if" },
    hint: 'It pairs with elif/else.',
    lesson:
      'Use if, elif, else: if x > 0: print("positive") else: print("non-positive"). Blocks are indented.',
  },
  {
    slug: 'for',
    title: 'Loops',
    description: 'Iterating over iterables.',
    prompt: 'Complete: for x ____ range(3):',
    placeholder: 'Enter the keyword...',
    rule: { type: "equalsCaseInsensitive", value: "in" },
    hint: 'Tiny keyword.',
    lesson:
      'for loops iterate: for x in [1,2,3]: print(x). Use range(n) to get 0..n-1.',
  },
  {
    slug: 'functions',
    title: 'Functions',
    description: 'Defining reusable blocks.',
    prompt: 'What keyword defines a function?',
    rule: { type: "equalsCaseInsensitive", value: "def" },
    hint: 'Three letters.',
    lesson:
      'Define functions using def: def add(a, b): return a + b. Use docstrings for documentation.',
  },
  {
    slug: 'imports',
    title: 'Imports',
    description: 'Using modules.',
    prompt: 'Fill: ____ math; print(math.pi)',
    placeholder: 'Enter the statement...',
    rule: { type: "equalsCaseInsensitive", value: "import" },
    hint: 'Starts with i...',
    lesson:
      'Use import to include modules: import math. Or from math import pi. Use as for aliases.',
  },
];

export const slugOrder = puzzles.map((p) => p.slug);

export function getPuzzle(slug: string) {
  return puzzles.find((p) => p.slug === slug);
}

export function getNextSlug(current: string) {
  const i = slugOrder.indexOf(current);
  if (i === -1) return slugOrder[0];
  return slugOrder[i + 1] ?? null;
}

export function totalPuzzles() {
  return puzzles.length;
}
