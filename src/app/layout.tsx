import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn Python - Interactive Python Learning Platform",
  description: "Master Python programming with interactive lessons, hands-on exercises, and step-by-step tutorials. Perfect for beginners and intermediate learners.",
  icons: {
    // Provide explicit sizes and type so browsers (and Vercel) reliably pick up the favicon.
    icon: [
      { url: "/python.png", sizes: "32x32", type: "image/png" },
      { url: "/python.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: { url: "/python.png", type: "image/png" },
    apple: { url: "/python.png", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Set initial theme before hydration to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {try { const k='learnpy::theme'; const t=localStorage.getItem(k)||'system'; const m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches; const dark = t==='dark' || (t==='system' && m); document.documentElement.classList.toggle('dark', !!dark);} catch(_) {}})();`,
          }}
        />
        <script 
          defer 
          src="https://umami.bitcreate.cloud/script.js" 
          data-website-id="5af4383a-3e59-40b0-bfe8-1088e176d79c"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
