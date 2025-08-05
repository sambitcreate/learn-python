"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Progress } from "../ui/primitives";
import { getJSON } from "@/lib/storage";
import { puzzles, totalPuzzles } from "@/lib/puzzles";

export default function Nav() {
  const pathname = usePathname();
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    // progress is number of slugs marked true in localStorage under 'progress'
    const prog = getJSON<Record<string, boolean>>("progress", {});
    const count = puzzles.reduce((acc: number, p) => acc + (prog[p.slug] ? 1 : 0), 0);
    setCompleted(count);
  }, [pathname]);

  const percent = useMemo(() => {
    const total = totalPuzzles();
    return total ? Math.round((completed / total) * 100) : 0;
  }, [completed]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          Learn Python
        </Link>
        <nav className="ml-auto flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/learn">Curriculum</Link>
          <Link className="hover:underline" href="/learn/intro">Continue</Link>
        </nav>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-3">
        <Progress value={percent} />
        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{completed} / {totalPuzzles()} completed</div>
      </div>
    </header>
  );
}
