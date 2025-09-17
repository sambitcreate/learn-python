"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Progress } from "../ui/primitives";
import { getCompletedCourses, getAllCourses, getLastVisitedCourse, getFirstIncompleteCourse, isLevelUnlocked } from "@/lib/levels";
import { Github, Search, Settings } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Nav() {
  const pathname = usePathname();
  const [completed, setCompleted] = useState<number>(0);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [resumeHref, setResumeHref] = useState<string | null>(null);

  useEffect(() => {
    const completedCourses = getCompletedCourses();
    const allCourses = getAllCourses();
    setCompleted(completedCourses.length);
    setTotalCourses(allCourses.length);

    // determine resume target
    const last = getLastVisitedCourse();
    if (last && isLevelUnlocked(last.levelId)) {
      setResumeHref(`/levels/${last.levelId}/${last.slug}`);
    } else {
      const firstIncomplete = getFirstIncompleteCourse();
      setResumeHref(firstIncomplete ? `/levels/${firstIncomplete.levelId}/${firstIncomplete.slug}` : "/levels");
    }
  }, [pathname]);

  const percent = useMemo(() => {
    return totalCourses ? Math.round((completed / totalCourses) * 100) : 0;
  }, [completed, totalCourses]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          Learn Python
        </Link>
        <nav className="ml-auto flex items-center gap-3 text-sm">
          {resumeHref && (
            <Link className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-3 py-1.5 hover:bg-primary/90 transition" href={resumeHref} aria-label="Continue where you left off">
              Continue
            </Link>
          )}
          <Link className="hover:underline" href="/levels">All Levels</Link>
          <Link className="hover:underline" href="/search" aria-label="Search lessons">
            <span className="inline-flex items-center gap-1"><Search className="h-4 w-4" aria-hidden />Search</span>
          </Link>
          <Link className="hover:underline" href="/settings" aria-label="Open settings">
            <span className="inline-flex items-center gap-1"><Settings className="h-4 w-4" aria-hidden />Settings</span>
          </Link>
          <ThemeToggle />
          <a
            href="https://github.com/sambitcreate/learn-python"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md p-1.5 hover:bg-accent/10 transition"
            aria-label="View project on GitHub"
            title="View project on GitHub"
          >
            <Github className="h-5 w-5 text-foreground" />
          </a>
        </nav>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-3">
        <Progress value={percent} />
        <div className="mt-1 text-xs text-muted-foreground">{completed} / {totalCourses} courses completed</div>
      </div>
    </header>
  );
}
