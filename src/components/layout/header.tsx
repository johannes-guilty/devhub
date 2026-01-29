/**
 * Header Component
 *
 * Main navigation header with logo, navigation links, and user button.
 * Responsive design with hamburger menu on mobile.
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Home, Code, MessageSquare, Trophy, Menu, X } from 'lucide-react';
import { UserButton } from './user-button';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Snippets', href: '/snippets', icon: Code },
  { name: 'Discussions', href: '/discussions', icon: MessageSquare },
  { name: 'Challenges', href: '/challenges', icon: Trophy },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/home" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DevHub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className="gap-2"
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Right side: User button and mobile menu toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <UserButton />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container flex flex-col px-4 py-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  className="justify-start gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
            <div className="mt-2 pt-2 border-t border-border">
              <UserButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
