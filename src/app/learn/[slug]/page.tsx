import { notFound } from "next/navigation";
import { getPuzzle, puzzles } from "@/lib/puzzles";
import LessonFrame from "@/components/lesson/LessonFrame";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return puzzles.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default function LessonPage({ params }: Params) {
  const puzzle = getPuzzle(params.slug);
  if (!puzzle) return notFound();
  return <LessonFrame puzzle={puzzle} />;
}
