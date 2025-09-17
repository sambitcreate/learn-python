import Link from "next/link";
import { levels } from "@/lib/levels";
import ResumeCTA from "@/components/ResumeCTA";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/primitives";
import Nav from "@/components/layout/Nav";
import { BookOpen, Target, Trophy, Zap, ChevronDown } from "lucide-react";

export const dynamic = "force-static";

import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const totalCourses = levels.reduce((sum, level) => sum + level.courses.length, 0);

  return (
    <div className="bg-background text-foreground">
      <Nav />
      {/* Hero Section - Full Viewport Height */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center space-y-8 px-4 relative">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Master Python Programming
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn Python through 5 progressive levels with {totalCourses} interactive courses. 
            Build from basics to expert-level applications.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/levels"
              className="inline-flex h-12 items-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground transition-all duration-700 ease-out hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] active:scale-95 active:transition-transform active:duration-75"
            >
              Start Your Journey
            </Link>
            <ResumeCTA />
            <Link
              href="/levels"
              className="inline-flex h-12 items-center rounded-md border border-border px-8 text-base font-medium transition-all duration-700 ease-out hover:bg-accent/10 hover:scale-[1.02] active:scale-95"
            >
              View All Levels
            </Link>
          </div>
          
          {/* Down Arrow */}
          <div className="mt-8 flex justify-center animate-bounce">
            <ChevronDown className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-16 space-y-16">

        {/* Learning Path */}
        <section className="space-y-8 py-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Your Learning Path</h2>
            <p className="text-muted-foreground">
              Progress through 5 carefully designed levels, each building on the previous
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            {levels.map((level, index) => (
              <Card key={level.id} className="text-center hover:shadow-lg transition-all duration-700 hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-lg font-bold ${
                    index === 0 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                    index === 1 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                    index === 2 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' :
                    index === 3 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {level.id}
                  </div>
                  <CardTitle className="text-sm font-semibold">
                    Level {level.id}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-2">
                    {level.courses.length} courses
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {level.title.replace(`Level ${level.id}: `, '')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Why Choose Our Python Course?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Target className="w-8 h-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Progressive Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Each level builds on the previous, ensuring solid foundations before advancing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Zap className="w-8 h-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Interactive Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn by doing with hands-on coding challenges and instant feedback.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="w-8 h-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Comprehensive Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  From basics to advanced topics like ML, web dev, and data science.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Trophy className="w-8 h-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monitor your progress and unlock new levels as you master concepts.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Level Details */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">What You&apos;ll Master</h2>
          <div className="space-y-4">
            {levels.slice(0, 3).map((level, index) => (
              <Card key={level.id} className="hover:shadow-lg transition-all duration-700">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      index === 1 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                    }`}>
                      {level.id}
                    </div>
                    <div>
                      <CardTitle>{level.title}</CardTitle>
                      <CardDescription>{level.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {level.courses.slice(0, 6).map((course) => (
                      <div key={course.slug} className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded">
                        {course.title}
                      </div>
                    ))}
                    {level.courses.length > 6 && (
                      <div className="text-sm text-muted-foreground px-3 py-2">
                        +{level.courses.length - 6} more
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/levels"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Explore All 5 Levels →
            </Link>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}
