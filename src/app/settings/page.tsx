"use client";

import React, { useMemo, useState } from "react";
import Nav from "@/components/layout/Nav";
import { Card, CardContent, CardHeader, CardTitle, Button, Alert } from "@/components/ui/primitives";
import { getCompletedCourses } from "@/lib/levels";

type ExportBundle = {
  version: 1;
  completedCourses: string[];
  lastVisited?: { levelId: number; slug: string } | null;
  exportedAt: string;
};

export default function SettingsPage() {
  const [importText, setImportText] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const completed = getCompletedCourses();

  const bundle: ExportBundle = useMemo(() => {
    if (typeof window === 'undefined') return { version: 1, completedCourses: [], lastVisited: null, exportedAt: new Date().toISOString() };
    const lastRaw = localStorage.getItem('learnpy::lastVisited');
    const last = lastRaw ? JSON.parse(lastRaw) : null;
    return {
      version: 1,
      completedCourses: completed,
      lastVisited: last,
      exportedAt: new Date().toISOString(),
    };
  }, [completed]);

  function resetProgress() {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('learnpy::progress:v1');
      localStorage.removeItem('learnpy::lastVisited');
      setMsg('Progress has been reset.');
      setErr(null);
      window.location.reload();
    } catch {
      setErr('Failed to reset progress.');
    }
  }

  function copyExport() {
    try {
      navigator.clipboard.writeText(JSON.stringify(bundle, null, 2));
      setMsg('Export copied to clipboard.');
      setErr(null);
    } catch {
      setErr('Clipboard copy failed. You can select and copy manually.');
    }
  }

  function downloadExport() {
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learn-python-progress-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importProgress() {
    try {
      const parsed = JSON.parse(importText) as ExportBundle;
      if (parsed.version !== 1 || !Array.isArray(parsed.completedCourses)) throw new Error('Invalid file');
      localStorage.setItem('learnpy::progress:v1', JSON.stringify(parsed.completedCourses));
      if (parsed.lastVisited) localStorage.setItem('learnpy::lastVisited', JSON.stringify(parsed.lastVisited));
      setMsg('Progress imported successfully.');
      setErr(null);
      setTimeout(() => window.location.reload(), 500);
    } catch {
      setErr('Import failed. Please check the file format.');
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImportText(String(reader.result));
    reader.readAsText(file);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

        {msg && <Alert title={msg} />}
        {err && <Alert title={err} variant="destructive" />}

        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Completed courses: <span className="font-medium">{completed.length}</span></p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={resetProgress} variant="destructive" aria-label="Reset progress">Reset Progress</Button>
              <Button onClick={copyExport} aria-label="Copy export">Copy Export</Button>
              <Button onClick={downloadExport} variant="secondary" aria-label="Download export">Download Export</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input type="file" accept="application/json" onChange={handleFile} aria-label="Select progress JSON file" />
            <textarea
              className="w-full h-40 p-3 rounded border border-border bg-background text-foreground"
              placeholder="Paste exported JSON here..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              aria-label="Import JSON textarea"
            />
            <Button onClick={importProgress} aria-label="Import progress">Import</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
