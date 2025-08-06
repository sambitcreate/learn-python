"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getCourse, getLevel, markCourseCompleted, getCompletedCourses } from "@/lib/levels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from "@/components/ui/primitives";
import Nav from "@/components/layout/Nav";
import { ArrowLeft, CheckCircle, Lightbulb, BookOpen, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const levelId = parseInt(params.levelId as string);
  const courseSlug = params.courseSlug as string;
  
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showLesson, setShowLesson] = useState(false);

  const level = getLevel(levelId);
  const course = getCourse(levelId, courseSlug);

  useEffect(() => {
    if (!course) return;
    
    const completed = getCompletedCourses();
    const courseKey = `${levelId}-${courseSlug}`;
    setIsCompleted(completed.includes(courseKey));
    
    // Show lesson immediately if course is already completed
    if (completed.includes(courseKey)) {
      setShowLesson(true);
      setIsCorrect(true);
    }
  }, [course, levelId, courseSlug]);

  if (!level || !course) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
        <Nav />
        <main className="mx-auto max-w-3xl px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Course Not Found</h1>
            <Link 
              href="/levels"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
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
      setShowLesson(true);
      if (!isCompleted) {
        markCourseCompleted(levelId, courseSlug);
        setIsCompleted(true);
      }
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

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        {/* Header */}
        <section className="space-y-4">
          <Link 
            href={`/levels/${levelId}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {level.title}
          </Link>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                {level.title}
              </span>
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
              {course.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Question Card */}
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg font-medium">{course.prompt}</p>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={course.placeholder || "Enter your answer..."}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  disabled={isCorrect === true}
                />
                
                <div className="flex gap-3">
                  <Button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim() || isCorrect === true}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Check Answer
                  </Button>
                  
                  {course.hint && !showHint && isCorrect !== true && (
                    <Button
                      onClick={() => setShowHint(true)}
                      variant="outline"
                      className="px-4 py-2 border border-amber-300 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Hint
                    </Button>
                  )}
                </div>
              </div>

              {/* Feedback */}
              {isCorrect === true && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Correct! Well done!</span>
                  </div>
                </div>
              )}

              {isCorrect === false && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-300">
                    Not quite right. Try again!
                  </p>
                </div>
              )}

              {/* Hint */}
              {showHint && course.hint && (
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Hint:</p>
                      <p className="text-amber-700 dark:text-amber-300">{course.hint}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lesson Card */}
          {showLesson && course.lesson && (
            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <BookOpen className="w-5 h-5" />
                  Lesson
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 dark:text-green-200 leading-relaxed">
                  {course.lesson}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          {isCorrect === true && (
            <div className="flex justify-between items-center pt-6 border-t border-zinc-200 dark:border-zinc-700">
              <Link
                href={`/levels/${levelId}`}
                className="inline-flex items-center px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Level
              </Link>
              
              {nextCourse ? (
                <Link
                  href={`/levels/${levelId}/${nextCourse.slug}`}
                  className="inline-flex items-center px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                  Next Course
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              ) : (
                <Link
                  href="/levels"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                  View All Levels
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
