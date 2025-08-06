"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Progress } from "../ui/primitives";
import { getCompletedCourses, getAllCourses } from "@/lib/levels";
import { Github } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();
  const [completed, setCompleted] = useState<number>(0);
  const [totalCourses, setTotalCourses] = useState<number>(0);

  useEffect(() => {
    const completedCourses = getCompletedCourses();
    const allCourses = getAllCourses();
    setCompleted(completedCourses.length);
    setTotalCourses(allCourses.length);
  }, [pathname]);

  const percent = useMemo(() => {
    return totalCourses ? Math.round((completed / totalCourses) * 100) : 0;
  }, [completed, totalCourses]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          Learn Python
        </Link>
        <nav className="ml-auto flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/levels">All Levels</Link>
          <Link className="hover:underline" href="/levels/1">Start Learning</Link>
          <a
            href="https://github.com/sambitcreate/learn-python"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            aria-label="View project on GitHub"
            title="View project on GitHub"
          >
            <Github className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          </a>
        </nav>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-3">
        <Progress value={percent} />
        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{completed} / {totalCourses} courses completed</div>
      </div>
    </header>
  );
}
