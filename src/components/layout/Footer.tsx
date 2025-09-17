"use client";

import React from "react";

export default function Footer() {
  const linkClass =
    "text-primary hover:text-primary/90 underline-offset-2 hover:underline";

  return (
    <footer className="w-full border-t border-border py-6 mt-10 bg-background">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
        <span className="mr-1">Made in NYC❤️ by</span>
        <a
          href="https://sambitbiswas.com"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Sambit
        </a>
        <span className="mx-1">|</span>
        <a
          href="https://github.com/sambitcreate/learn-python"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Github
        </a>
        <span className="mx-1">|</span>
        <a
          href="https://parsely.us"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Parsely.us
        </a>
        <span className="mx-1">|</span>
        <a
          href="https://resmatcha.com"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          ResMatcha
        </a>
        <span className="mx-1">|</span>
        <a
          href="https://buymeacoffee.com/sambitcreate"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Coffee
        </a>
      </div>
    </footer>
  );
}
