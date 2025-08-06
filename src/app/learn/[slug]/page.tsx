import { notFound } from "next/navigation";
import { getPuzzle, puzzles } from "@/lib/puzzles";
import LessonFrame from "@/components/lesson/LessonFrame";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return puzzles.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function LessonPage({ params }: Params) {
  const { slug } = await params;
  const puzzle = getPuzzle(slug);
  if (!puzzle) return notFound();
  return <LessonFrame puzzle={puzzle} />;
}
