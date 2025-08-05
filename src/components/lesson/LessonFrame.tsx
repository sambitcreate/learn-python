"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Alert, A } from "../ui/primitives";
import { getJSON, setJSON } from "@/lib/storage";
import { Puzzle, getNextSlug } from "@/lib/puzzles";
import Link from "next/link";

type Props = {
  puzzle: Puzzle;
};

export default function LessonFrame({ puzzle }: Props) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [message, setMessage] = useState<string>("");

  const progress = useMemo(() => getJSON<Record<string, boolean>>("progress", {}), []);
  const completed = Boolean(progress[puzzle.slug]);

  useEffect(() => {
    // reset UI when puzzle changes
    setAnswer("");
    setStatus("idle");
    setMessage("");
  }, [puzzle.slug]);

  function submit() {
    const raw = answer.trim();
    let correct = false;
    let feedback = "Not quite. Try again!";

    switch (puzzle.rule.type) {
      case "equals":
        correct = raw === String(puzzle.rule.value ?? "");
        if (!correct) feedback = `Expected exactly "${puzzle.rule.value}".`;
        break;
      case "equalsCaseInsensitive":
        correct = raw.toLowerCase() === String(puzzle.rule.value ?? "").toLowerCase();
        if (!correct) feedback = `Expected ${String(puzzle.rule.value)} (case-insensitive).`;
        break;
      case "includesAny": {
        const list = Array.isArray(puzzle.rule.value) ? puzzle.rule.value : [];
        const lower = raw.toLowerCase();
        correct = list.some((v) => lower.includes(String(v).toLowerCase()));
        if (!correct) feedback = `Include any of: ${list.join(", ")}.`;
        break;
      }
      case "keywordEQ": {
        // For prompts like "for x ____ range(3):", expect specific keyword
        correct = raw === String(puzzle.rule.value ?? "");
        if (!correct) feedback = `Fill with keyword "${puzzle.rule.value}".`;
        break;
      }
      default:
        correct = false;
    }

    if (correct) {
      const prog = getJSON<Record<string, boolean>>("progress", {});
      const updated = { ...prog, [puzzle.slug]: true };
      setJSON("progress", updated);
      setStatus("correct");
      setMessage("Correct! Progress saved.");
    } else {
      setStatus("incorrect");
      setMessage(feedback);
    }
  }

  const next = getNextSlug(puzzle.slug);

  return (
    <div className="mx-auto max-w-3xl w-full">
      <Card>
        <CardHeader>
          <CardTitle>{puzzle.title}</CardTitle>
          <CardDescription>{puzzle.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {puzzle.lesson && (
            <div className="prose prose-zinc dark:prose-invert">
              <p>{puzzle.lesson}</p>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-sm font-medium">{puzzle.prompt}</div>
            <div className="flex items-center gap-2">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={puzzle.placeholder || "Type your answer..."}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                }}
              />
              <Button onClick={submit}>Check</Button>
            </div>
            {puzzle.hint && status !== "correct" && (
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Hint: {puzzle.hint}</div>
            )}
          </div>

          {status === "correct" && (
            <Alert title="Nice!" description={message} />
          )}
          {status === "incorrect" && (
            <Alert variant="destructive" title="Try again" description={message} />
          )}

          {completed && status !== "correct" && (
            <Alert title="Completed previously" description="You already solved this puzzle. You can proceed or retry for practice." />
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link href="/learn" className="text-sm underline underline-offset-4">Back to Curriculum</Link>
          <div className="flex items-center gap-2">
            {next ? (
              <Button as-child="true" variant="secondary">
                <A href={`/learn/${next}`}>Next Lesson →</A>
              </Button>
            ) : (
              <Button variant="secondary" disabled>End of course</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
