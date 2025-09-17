"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getCourse, getLevel, markCourseCompleted, getCompletedCourses, setLastVisitedCourse } from "@/lib/levels";
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from "@/components/ui/primitives";
import Nav from "@/components/layout/Nav";
import { ArrowLeft, CheckCircle, Lightbulb, BookOpen, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const params = useParams();

  const levelId = parseInt(params.levelId as string);
  const courseSlug = params.courseSlug as string;
  
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [failures, setFailures] = useState(0);
  const [revealedHints, setRevealedHints] = useState(0);
  // Always show lessons - removed conditional state

  const level = getLevel(levelId);
  const course = getCourse(levelId, courseSlug);

  useEffect(() => {
    if (!course) return;
    
    const completed = getCompletedCourses();
    const courseKey = `${levelId}-${courseSlug}`;
    setIsCompleted(completed.includes(courseKey));
    
    // Set completion status
    if (completed.includes(courseKey)) {
      setIsCorrect(true);
    }
    // Persist last visited for resume CTA
    setLastVisitedCourse(levelId, courseSlug);
    // Load failures from storage
    try {
      const raw = localStorage.getItem(`learnpy::fc:${courseKey}`);
      const n = raw ? Number(raw) : 0;
      setFailures(Number.isFinite(n) ? n : 0);
      setRevealedHints(0);
    } catch {}
  }, [course, levelId, courseSlug]);

  if (!level || !course) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main className="mx-auto max-w-3xl px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Course Not Found</h1>
            <Link 
              href="/levels"
              className="inline-flex items-center text-primary hover:text-primary/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Levels
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const checkAnswer = () => {
    const { rule } = course;
    let correct = false;

    switch (rule.type) {
      case "equals":
        correct = userAnswer.trim() === rule.value;
        break;
      case "equalsCaseInsensitive":
        correct = userAnswer.trim().toLowerCase() === (typeof rule.value === 'string' ? rule.value.toLowerCase() : '');
        break;
      case "includesAny":
        if (Array.isArray(rule.value)) {
          correct = rule.value.some(val => 
            userAnswer.trim().toLowerCase().includes(val.toLowerCase())
          );
        }
        break;
      case "keywordEQ":
        correct = userAnswer.trim().toLowerCase() === (typeof rule.value === 'string' ? rule.value.toLowerCase() : '');
        break;
    }

    setIsCorrect(correct);
    
    if (correct) {
      if (!isCompleted) {
        markCourseCompleted(levelId, courseSlug);
        setIsCompleted(true);
      }
    }
    if (!correct) {
      const next = failures + 1;
      setFailures(next);
      try { localStorage.setItem(`learnpy::fc:${levelId}-${courseSlug}`, String(next)); } catch {}
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer.trim()) {
      checkAnswer();
    }
  };

  const getNextCourse = () => {
    const currentIndex = level.courses.findIndex(c => c.slug === courseSlug);
    if (currentIndex < level.courses.length - 1) {
      return level.courses[currentIndex + 1];
    }
    return null;
  };

  const nextCourse = getNextCourse();
  const prevCourse = (() => {
    const currentIndex = level.courses.findIndex(c => c.slug === courseSlug);
    if (currentIndex > 0) return level.courses[currentIndex - 1];
    return null;
  })();

  const hints: string[] = Array.isArray((course as any).hints)
    ? ((course as any).hints as string[])
    : course.hint
      ? [course.hint]
      : [];

  const canRevealMoreHints = revealedHints < Math.min(hints.length, failures);

  function revealNextHint() {
    if (canRevealMoreHints) setRevealedHints(revealedHints + 1);
    setShowHint(true);
  }

  function solutionText(): string | null {
    const rule = course.rule;
    switch (rule.type) {
      case "equals":
      case "equalsCaseInsensitive":
      case "keywordEQ":
        return typeof rule.value === "string" ? rule.value : null;
      case "includesAny":
        return Array.isArray(rule.value) ? rule.value.join(", ") : null;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        {/* Header */}
        <section className="space-y-4">
          <Link 
            href={`/levels/${levelId}`}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {level.title}
          </Link>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {level.title}
              </span>
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {course.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Lesson Card - Always displayed first */}
          {course.lesson && (
            <Card className="border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <BookOpen className="w-5 h-5 text-primary" />
                  📖 Lesson
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="leading-relaxed prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: course.lesson }} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Question Card */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg font-medium">{course.prompt}</p>
              
              <div className="space-y-3">
                <label htmlFor="answer" className="sr-only">Answer</label>
                <Input
                  id="answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={course.placeholder || "Enter your answer..."}
                  disabled={isCorrect === true}
                />
                
                <div className="flex gap-3">
                  <Button onClick={checkAnswer} disabled={!userAnswer.trim() || isCorrect === true}>
                    Check Answer
                  </Button>
                  
                  {hints.length > 0 && !isCorrect && (
                    <Button
                      onClick={revealNextHint}
                      variant="outline"
                      className="px-4 py-2"
                      aria-label="Show a hint"
                      disabled={!canRevealMoreHints}
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      {canRevealMoreHints ? "Hint" : "No more hints"}
                    </Button>
                  )}
                </div>
              </div>

              {/* Feedback */}
              <div aria-live="polite">
              {isCorrect === true && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Correct! Well done!</span>
                  </div>
                </div>
              )}

              {isCorrect === false && (
                <div className="p-4 bg-muted border border-border rounded-lg">
                  <p className="text-muted-foreground">
                    Not quite right. Try again!
                  </p>
                </div>
              )}
              </div>

              {/* Hint */}
              {showHint && hints.length > 0 && (
                <div className="p-4 bg-muted border border-border rounded-lg space-y-2">
                  {[...Array(revealedHints)].map((_, i) => (
                    <div className="flex items-start gap-2" key={i}>
                      <Lightbulb className="w-5 h-5 text-primary mt-0.5" aria-hidden />
                      <div>
                        <p className="font-medium mb-1">Hint {i + 1}:</p>
                        <p className="text-muted-foreground">{hints[i]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reveal solution after 3 failed attempts */}
              {failures >= 3 && !isCorrect && solutionText() && (
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Solution:</p>
                  <code className="inline-block px-2 py-1 rounded bg-muted text-foreground">{solutionText()}</code>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lesson moved above - removed duplicate */}

          {/* Sticky Navigation */}
          <div className="sticky bottom-0 bg-background/80 backdrop-blur border-t border-border py-3 flex justify-between items-center px-2 rounded-b-xl">
            <div>
              {prevCourse ? (
                <Link
                  href={`/levels/${levelId}/${prevCourse.slug}`}
                  className="inline-flex items-center px-4 py-2 text-foreground hover:opacity-80 transition-colors"
                  aria-label="Previous lesson"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" aria-hidden />
                  Previous
                </Link>
              ) : (
                <Link
                  href={`/levels/${levelId}`}
                  className="inline-flex items-center px-4 py-2 text-foreground hover:opacity-80 transition-colors"
                  aria-label="Back to level"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" aria-hidden />
                  Back to Level
                </Link>
              )}
            </div>
            <div>
              {nextCourse ? (
                <Link
                  href={`/levels/${levelId}/${nextCourse.slug}`}
                  className={`inline-flex items-center px-6 py-2 rounded-lg transition-all duration-300 ${
                    isCorrect ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  aria-label="Next lesson"
                  aria-disabled={!isCorrect}
                  tabIndex={isCorrect ? 0 : -1}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden />
                </Link>
              ) : (
                <Link
                  href="/levels"
                  className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                  aria-label="View all levels"
                >
                  View All Levels
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden />
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
