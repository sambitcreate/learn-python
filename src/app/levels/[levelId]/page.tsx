"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getLevel, isLevelUnlocked, getLevelProgress, getCompletedCourses } from "@/lib/levels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from "@/components/ui/primitives";
import Nav from "@/components/layout/Nav";
import { ArrowLeft, CheckCircle, Lock, Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function LevelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = parseInt(params.levelId as string);
  
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [progress, setProgress] = useState(0);

  const level = getLevel(levelId);

  useEffect(() => {
    if (!level) return;
    
    const completed = getCompletedCourses();
    const unlocked = isLevelUnlocked(levelId);
    const levelProgress = getLevelProgress(levelId);
    
    setCompletedCourses(completed);
    setIsUnlocked(unlocked);
    setProgress(levelProgress);
    
    // Redirect if level is locked
    if (!unlocked) {
      router.push('/levels');
    }
  }, [level, levelId, router]);

  if (!level) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
        <Nav />
        <main className="mx-auto max-w-5xl px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Level Not Found</h1>
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

  if (!isUnlocked) {
    return null; // Will redirect
  }

  const isCourseCompleted = (courseSlug: string) => {
    return completedCourses.includes(`${levelId}-${courseSlug}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        {/* Header */}
        <section className="space-y-4">
          <Link 
            href="/levels"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Levels
          </Link>
          
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
              progress === 100 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            }`}>
              {progress === 100 ? (
                <CheckCircle className="w-8 h-8" />
              ) : (
                levelId
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{level.title}</h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-1">
                {level.description}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">
                Level Progress: {level.courses.filter(c => isCourseCompleted(c.slug)).length} of {level.courses.length} courses completed
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className={`h-3 ${
                progress === 100 
                  ? '[&>div]:bg-green-500' 
                  : '[&>div]:bg-blue-500'
              }`}
            />
          </div>
        </section>

        {/* Courses Grid */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Courses in this Level</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {level.courses.map((course, index) => {
              const isCompleted = isCourseCompleted(course.slug);
              
              return (
                <Card key={course.slug} className="group hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                            Course {index + 1}
                          </span>
                          {isCompleted && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                        <CardDescription className="mt-1 text-sm">
                          {course.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/levels/${levelId}/${course.slug}`}
                        className={`inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-all duration-200 ease-out hover:shadow-lg hover:scale-[1.02] active:scale-95 active:transition-transform active:duration-75 ${
                          isCompleted
                            ? 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600'
                            : 'bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Review
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </>
                        )}
                      </Link>
                      
                      {course.lesson && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs truncate">
                          {course.lesson.substring(0, 50)}...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Level Completion Message */}
        {progress === 100 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                🎉 Level {levelId} Complete!
              </h3>
            </div>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Congratulations! You've mastered all courses in this level.
            </p>
            {levelId < 5 && (
              <Link
                href={`/levels/${levelId + 1}`}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Continue to Level {levelId + 1}
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            )}
          </div>
        )}

        {/* Next Level Preview */}
        {progress < 100 && levelId < 5 && (
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Next: Level {levelId + 1}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Complete this level to unlock the next stage of your Python journey!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
