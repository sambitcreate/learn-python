"use client";

import Link from "next/link";
import { levels, isLevelUnlocked, getLevelProgress } from "@/lib/levels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Progress } from "@/components/ui/primitives";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
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
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Python Learning Journey</h1>
          <p className="text-lg text-muted-foreground">
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
                    ? 'hover:shadow-lg hover:scale-[1.01] cursor-pointer border-border' 
                    : 'opacity-60 cursor-not-allowed border-border'
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        isCompleted 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : isUnlocked 
                            ? 'bg-muted text-foreground/70'
                            : 'bg-muted text-muted-foreground'
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
                      <div className="text-sm text-muted-foreground mb-2">
                        {level.courses.length} courses
                      </div>
                      {isUnlocked ? (
                        <Link
                          href={`/levels/${level.id}`}
                          className="inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-700 ease-out hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] active:scale-95 active:transition-transform active:duration-75"
                        >
                          {progress > 0 ? 'Continue' : 'Start Level'}
                        </Link>
                      ) : (
                        <Button disabled variant="outline" className="inline-flex h-10 items-center rounded-md px-6 text-sm font-medium cursor-not-allowed">
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
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress 
                      value={progress} 
                      className={`h-2 ${
                        isCompleted 
                          ? '[&>div]:bg-green-500' 
                          : isUnlocked 
                            ? '' 
                            : '[&>div]:bg-muted-foreground/40'
                      }`}
                    />
                  </div>
                  
                  {level.id > 1 && !isUnlocked && (
                    <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
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

        <div className="mt-12 p-6 bg-card rounded-xl border border-border">
          <h2 className="text-xl font-semibold mb-3 text-foreground">Your Learning Path</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-foreground mb-2">Level 1-2: Foundation</h3>
              <p className="text-foreground">Master Python basics and intermediate concepts</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Level 3-4: Advanced</h3>
              <p className="text-foreground">Learn advanced patterns and professional development</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Level 5: Expert</h3>
              <p className="text-foreground">Specialized applications and cutting-edge topics</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Progressive Learning</h3>
              <p className="text-foreground">Each level builds upon the previous one</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
