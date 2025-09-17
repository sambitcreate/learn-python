"use client";

import Link from "next/link";
import { getLastVisitedCourse, getFirstIncompleteCourse, isLevelUnlocked } from "@/lib/levels";
import { useEffect, useState } from "react";

export default function ResumeCTA({ className = "" }: { className?: string }) {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    const last = getLastVisitedCourse();
    if (last && isLevelUnlocked(last.levelId)) {
      setHref(`/levels/${last.levelId}/${last.slug}`);
    } else {
      const firstIncomplete = getFirstIncompleteCourse();
      setHref(firstIncomplete ? `/levels/${firstIncomplete.levelId}/${firstIncomplete.slug}` : "/levels");
    }
  }, []);

  if (!href) return null;
  return (
    <Link
      href={href}
      className={className || "inline-flex h-12 items-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground transition-all duration-700 ease-out hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] active:scale-95"}
      aria-label="Continue where you left off"
    >
      Continue
    </Link>
  );
}
