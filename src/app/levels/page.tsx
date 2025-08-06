"use client";

import Link from "next/link";
import { levels, isLevelUnlocked, getLevelProgress } from "@/lib/levels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Progress } from "@/components/ui/primitives";
import Nav from "@/components/layout/Nav";
import { Lock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function LevelsPage() {
  const [levelProgress, setLevelProgress] = useState<{ [key: number]: number }>({});
  const [unlockedLevels, setUnlockedLevels] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // Calculate progress and unlock status for each level
    const progress: { [key: number]: number } = {};
    const unlocked: { [key: number]: boolean } = {};
    
    levels.forEach(level => {
      progress[level.id] = getLevelProgress(level.id);
      unlocked[level.id] = isLevelUnlocked(level.id);
    });
    
    setLevelProgress(progress);
    setUnlockedLevels(unlocked);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Python Learning Journey</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Master Python through 5 progressive levels. Complete each level to unlock the next!
          </p>
        </section>

        <div className="grid gap-6">
          {levels.map((level) => {
            const isUnlocked = unlockedLevels[level.id];
            const progress = levelProgress[level.id] || 0;
            const isCompleted = progress === 100;

            return (
              <Card 
                key={level.id} 
                className={`group transition-all duration-200 ${
                  isUnlocked 
                    ? 'hover:shadow-lg hover:scale-[1.01] cursor-pointer border-blue-200 dark:border-blue-800' 
                    : 'opacity-60 cursor-not-allowed border-gray-200 dark:border-gray-800'
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        isCompleted 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : isUnlocked 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : isUnlocked ? (
                          level.id
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{level.title}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {level.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                        {level.courses.length} courses
                      </div>
                      {isUnlocked ? (
                        <Link
                          href={`/levels/${level.id}`}
                          className="inline-flex h-10 items-center rounded-md bg-black px-6 text-sm font-medium text-white transition-all duration-200 ease-out hover:bg-black/90 hover:shadow-lg hover:scale-[1.02] active:scale-95 active:transition-transform active:duration-75 dark:bg-white dark:text-black dark:hover:bg-white/90"
                        >
                          {progress > 0 ? 'Continue' : 'Start Level'}
                        </Link>
                      ) : (
                        <Button 
                          disabled 
                          className="inline-flex h-10 items-center rounded-md px-6 text-sm font-medium opacity-50 cursor-not-allowed"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress 
                      value={progress} 
                      className={`h-2 ${
                        isCompleted 
                          ? '[&>div]:bg-green-500' 
                          : isUnlocked 
                            ? '[&>div]:bg-blue-500' 
                            : '[&>div]:bg-gray-400'
                      }`}
                    />
                  </div>
                  
                  {level.id > 1 && !isUnlocked && (
                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <p className="text-sm text-amber-700 dark:text-amber-300 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Complete Level {level.id - 1} to unlock this level
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">Your Learning Path</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-black dark:text-white mb-2">Level 1-2: Foundation</h3>
              <p className="text-black dark:text-white">Master Python basics and intermediate concepts</p>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-white mb-2">Level 3-4: Advanced</h3>
              <p className="text-black dark:text-white">Learn advanced patterns and professional development</p>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-white mb-2">Level 5: Expert</h3>
              <p className="text-black dark:text-white">Specialized applications and cutting-edge topics</p>
            </div>
            <div>
              <h3 className="font-medium text-black dark:text-white mb-2">Progressive Learning</h3>
              <p className="text-black dark:text-white">Each level builds upon the previous one</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
