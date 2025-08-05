import Link from "next/link";
import { puzzles } from "@/lib/puzzles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Progress } from "@/components/ui/primitives";
import Nav from "@/components/layout/Nav";

export const dynamic = "force-static";

export default function LearnIndexPage() {
  // Progress bar duplicated here for SSR; actual percent in Nav is client-side.
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Curriculum</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Work through short interactive puzzles. Your progress is saved in your browser.
          </p>
        </section>

        <div className="grid sm:grid-cols-2 gap-4">
          {puzzles.map((p) => (
            <Card key={p.slug} className="group">
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Link
                  href={`/learn/${p.slug}`}
                  className="inline-flex h-10 items-center rounded-md bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Start
                </Link>
                <div className="w-28">
                  <Progress value={0} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
