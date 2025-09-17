"use client";

import React, { useMemo, useState } from "react";
import Nav from "@/components/layout/Nav";
import { levels } from "@/lib/levels";
import { Card, CardContent, CardHeader, CardTitle, Input } from "@/components/ui/primitives";
import Link from "next/link";

type Row = {
  levelId: number;
  levelTitle: string;
  slug: string;
  title: string;
  description: string;
};

const data: Row[] = levels.flatMap((lvl) =>
  lvl.courses.map((c) => ({
    levelId: lvl.id,
    levelTitle: lvl.title,
    slug: c.slug,
    title: c.title,
    description: c.description,
  }))
);

export default function SearchPage() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [] as Row[];
    return data.filter((r) =>
      [r.title, r.description, r.levelTitle].some((f) => f.toLowerCase().includes(query))
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <div>
          <label htmlFor="search" className="sr-only">Search lessons</label>
          <Input id="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search lessons by title or keywords..." />
        </div>

        {q && (
          <p className="text-sm text-muted-foreground">{results.length} results</p>
        )}

        <div className="grid gap-3">
          {results.map((r) => (
            <Card key={`${r.levelId}-${r.slug}`} className="hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link href={`/levels/${r.levelId}/${r.slug}`} className="hover:underline">
                    {r.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                <div className="mb-1 text-foreground font-medium">{r.levelTitle}</div>
                {r.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
