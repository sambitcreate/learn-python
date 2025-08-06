"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "./utils";

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform active:scale-95 hover:scale-[1.02] active:transition-transform active:duration-75";
  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
    ghost: "bg-transparent hover:bg-accent/10 hover:shadow-sm",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg",
    outline: "border border-border hover:bg-accent/5 hover:shadow-md hover:border-border/80",
  };
  const sizes: Record<string, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-700 ease-out hover:shadow-lg hover:scale-[1.02] hover:border-border/80", className)} {...props} />;
}
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-0", className)} {...props} />;
}
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold tracking-tight", className)} {...props} />;
}
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-600 ease-out hover:border-input/80 hover:shadow-sm focus:scale-[1.01] focus:shadow-md",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export function Progress({ value, className }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full h-2 rounded-full bg-secondary overflow-hidden transition-all duration-700 hover:h-3 hover:shadow-sm", className)}>
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

export function Alert({ title, description, variant = "default", className }: { title?: string; description?: string; variant?: "default" | "destructive"; className?: string }) {
  const styles =
    variant === "destructive"
      ? "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/30 dark:text-red-200"
      : "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100";
  return (
    <div className={cn("w-full rounded-lg border p-4 transition-all duration-700 ease-out animate-in slide-in-from-top-2 fade-in-0 hover:shadow-md hover:scale-[1.01]", styles, className)}>
      {title && <div className="font-semibold">{title}</div>}
      {description && <div className="text-sm opacity-90">{description}</div>}
    </div>
  );
}

export function A({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50 transition-all duration-600 ease-out hover:underline-offset-8 hover:decoration-2", className)}>
      {children}
    </Link>
  );
}
