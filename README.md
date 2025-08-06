# 🐍 Learn Python - Interactive Learning Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC)](https://tailwindcss.com/)

A comprehensive, interactive web application for learning Python programming from basics to advanced topics. Features 50+ lessons across 5 progressive levels, each with detailed educational content followed by hands-on coding challenges.

## 🌟 Features

### For Learners
- **Progressive Learning Path**: 5 levels from Python fundamentals to expert applications
- **Comprehensive Content**: 50+ lessons covering everything from basic syntax to machine learning
- **Interactive Challenges**: Each lesson includes hands-on coding exercises with instant feedback
- **Educational Approach**: 2-3 paragraphs of detailed explanation before each challenge
- **Progress Tracking**: Your learning progress is saved locally in your browser
- **Modern UI**: Clean, responsive design built with Tailwind CSS and shadcn/ui components
- **No Registration Required**: Start learning immediately without creating an account

### Learning Levels

**Level 1: Python Fundamentals**
- Basic syntax: print(), comments, variables
- Data types: strings, numbers, f-strings
- Data structures: lists, dictionaries
- Control flow: conditions, loops
- Functions and imports

**Level 2: Intermediate Python**
- Advanced data structures: tuples, sets
- String processing and dictionary mastery
- Function parameters (*args, **kwargs)
- Error handling and file I/O
- Object-oriented programming basics
- Modules, packages, and testing

**Level 3: Advanced Python**
- Decorators and metaprogramming
- Context managers and resource management
- Iterators and generators
- Functional programming with lambda
- Regular expressions and datetime handling
- JSON/API integration

**Level 4: Professional Development**
- Design patterns and architecture
- Asynchronous programming (async/await)
- Database integration and ORMs
- Web frameworks (Flask/Django)
- Advanced testing and TDD
- Performance optimization

**Level 5: Expert Applications**
- Data analysis with pandas and NumPy
- Machine learning with scikit-learn
- Deep learning fundamentals
- Computer vision with OpenCV
- Natural language processing
- Web scraping and automation
- GUI development with Tkinter

## 🚀 Quick Start for Users

### Option 1: Use the Live Demo
Visit the deployed application at [your-deployed-url] to start learning immediately!

### Option 2: Run Locally
1. **Prerequisites**: Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed

2. **Download the project**:
   ```bash
   # Download as ZIP from GitHub or clone the repository
   git clone https://github.com/your-username/learn-python.git
   cd learn-python
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

6. **Start learning!** Click "Start Learning" and begin your Python journey

## 🛠️ Developer Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/learn-python.git
   cd learn-python
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── learn/
│       ├── layout.tsx           # Learning layout with navigation
│       ├── page.tsx             # Course curriculum overview
│       └── [levelId]/
│           └── [slug]/
│               └── page.tsx     # Individual lesson pages
├── components/
│   ├── lesson/
│   │   └── LessonFrame.tsx      # Main lesson component
│   ├── layout/
│   │   └── Nav.tsx              # Navigation and progress
│   └── ui/
│       ├── primitives.tsx       # shadcn/ui-style components
│       └── utils.ts             # Utility functions
└── lib/
    ├── levels.ts                # Course content and structure
    └── storage.ts               # Local storage utilities
```

## 🎨 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components inspired by [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React hooks + localStorage
- **Deployment**: Vercel-ready (or any Node.js hosting)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Add New Lessons**: Expand the curriculum with new topics
2. **Improve Existing Content**: Enhance explanations, fix typos, add examples
3. **UI/UX Improvements**: Better design, accessibility, mobile responsiveness
4. **Bug Fixes**: Report and fix issues
5. **Feature Requests**: Suggest new features or improvements
6. **Translations**: Help make the platform available in other languages

### Getting Started

1. **Fork the repository** on GitHub
2. **Create a new branch** for your feature: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test them thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to your branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request** with a clear description of your changes

### Content Guidelines

When adding or modifying lessons:
- Follow the existing format: 2-3 educational paragraphs followed by a coding challenge
- Ensure content is beginner-friendly but comprehensive
- Include real-world examples and best practices
- Test all code examples and challenges
- Maintain consistent difficulty progression

### Code Guidelines

- Follow the existing TypeScript and React patterns
- Use Tailwind CSS for styling
- Ensure components are accessible and responsive
- Add comments for complex logic
- Test your changes across different browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Support

If you find this project helpful and would like to support its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20Development-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/sambitcreate)

Your support helps maintain and improve this free educational resource!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Python educational content curated for progressive learning
- Community contributions and feedback
- Special thanks to [TweakCN](https://github.com/jnsahaj/tweakcn) for the Neo Brutalism theme. [Try it out here](https://tweakcn.com/editor/theme?theme=neo-brutalism)
- Special thanks to [Anthropic](https://www.anthropic.com/) and [Claude Sonnet 4.0](https://www.anthropic.com/news/claude-4) for their AI assistance in developing this project

## 📊 Project Stats

- **50+ Interactive Lessons** across 5 difficulty levels
- **Comprehensive Coverage** from basics to advanced topics
- **Modern Web Technologies** for optimal learning experience
- **Open Source** and free for everyone
- **Community Driven** development and content

---

**Ready to start your Python journey?** [Get Started Now!](http://localhost:3000)

**Questions or suggestions?** [Open an issue](https://github.com/your-username/learn-python/issues) or [start a discussion](https://github.com/your-username/learn-python/discussions)

## Running Locally
1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npm run dev
   ```
3. Open:
   ```
   http://localhost:3000
   ```

## How It Works
- Puzzles are defined in `src/lib/puzzles.ts` with:
  - `slug`: route identifier
  - `title`, `description`, `lesson`: content
  - `prompt`, optional `placeholder`, optional `hint`
  - `check(answer)`: returns true for correct, or a string with feedback
- Lesson UI uses `LessonFrame.tsx`:
  - Handles input, Enter-to-submit, feedback UI, and saving progress to `localStorage` via `src/lib/storage.ts`.
  - Provides a “Next Lesson” button using the slug order.
- Top navigation (`Nav.tsx`) displays overall progress (completed/total) with a progress bar.

## Adding/Editing Lessons
1. Edit `src/lib/puzzles.ts` to add a new puzzle object to the `puzzles` array.
2. Include a unique `slug`.
3. `check(answer)` should be a simple predicate returning `true` or a feedback string.
4. The dynamic route `/learn/[slug]` will automatically include the new lesson.

## Notes
- The shadcn/ui components are implemented as minimal in-project primitives for portability. If you want the full shadcn/ui stack, you can integrate it via their CLI and replace these primitives accordingly.
- Progress is stored under a `learnpy::progress` key prefix in `localStorage`.

## Production
Build and start:
```
npm run build
npm start
```

## License
MIT
