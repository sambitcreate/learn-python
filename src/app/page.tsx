import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(0,0,0,0.08),transparent)] dark:bg-[radial-gradient(80%_50%_at_50%_0%,rgba(255,255,255,0.08),transparent)]" />
        <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300">
              Interactive course • Browser progress
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              Learn Python Basics with Puzzles
            </h1>
            <p className="max-w-[60ch] text-zinc-600 dark:text-zinc-400">
              A minimal, focused learning experience. Ten bite-sized lessons with interactive checks.
              Your progress is saved locally in your browser.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/learn/intro"
                className="inline-flex h-12 items-center rounded-md bg-black px-6 text-base font-medium text-white transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Start Learning
              </Link>
              <Link
                href="/learn"
                className="inline-flex h-12 items-center rounded-md border border-zinc-200 dark:border-zinc-800 px-6 text-base font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 grid sm:grid-cols-3 gap-6">
        <Feature
          title="Hands-on"
          desc="Each page includes a quick puzzle to validate understanding."
        />
        <Feature
          title="Concise lessons"
          desc="Short explanations that get right to the point."
        />
        <Feature
          title="No accounts"
          desc="Progress is saved in your browser. Private and simple."
        />
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{desc}</div>
    </div>
  );
}
