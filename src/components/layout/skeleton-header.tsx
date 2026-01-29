/**
 * Skeleton Header Component
 *
 * Example skeleton for header loading state.
 * Demonstrates the skeleton pattern for layout components.
 *
 * @example
 * if (loading) return <SkeletonHeader />
 * return <Header />
 */

import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Navigation skeleton */}
        <nav className="hidden md:flex items-center gap-1">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </nav>

        {/* User button skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </header>
  );
}
