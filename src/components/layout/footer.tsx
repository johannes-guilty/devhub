/**
 * Footer Component
 *
 * Site footer with links and copyright information.
 */

import Link from 'next/link';
import { Code } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 px-4 md:flex-row">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Code className="h-5 w-5" />
          <span className="text-sm">DevHub © {currentYear}</span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
