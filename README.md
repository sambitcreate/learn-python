# Learn Python – Interactive Basics (Next.js + shadcn-style UI)

An interactive, minimal web app for learning Python basics through short lessons with a puzzle on each page. Progress is saved to your browser (localStorage), and the design uses a clean, shadcn/ui-inspired Tailwind style.

## Tech
- Next.js App Router (TypeScript)
- Tailwind CSS
- shadcn-style components (minimal inlined primitives)
- LocalStorage for persistence

## File Structure
```
src/
  app/
    favicon.ico
    globals.css
    layout.tsx
    page.tsx                 # Landing page with Start button
    learn/
      layout.tsx             # Lessons layout with sticky progress nav
      page.tsx               # Curriculum index
      [slug]/
        page.tsx             # Dynamic lesson page using LessonFrame
  components/
    lesson/
      LessonFrame.tsx        # Shared lesson shell & puzzle interaction
    layout/
      Nav.tsx                # Top nav + progress bar
    ui/
      primitives.tsx         # Button, Card, Input, Progress, Alert, A (shadcn-style)
      utils.ts               # cn() helper
  lib/
    puzzles.ts               # 10+ puzzles (slug, prompt, validation, hints, lesson)
    storage.ts               # SSR-safe localStorage helpers
public/
  next.svg
  vercel.svg
  globe.svg
  file.svg
  window.svg
```

## Features
- Dashing minimal landing page with “Start Learning” and Curriculum.
- At least 10 lessons (intro, comments, variables, strings, f-strings, lists, dicts, if, for, functions, imports).
- Each lesson has an interactive puzzle with validation and hints.
- Progress is saved per lesson in the browser (no account).
- Curriculum index lists all lessons and links into each.
- Clean UI using shadcn-like Tailwind primitives.

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
