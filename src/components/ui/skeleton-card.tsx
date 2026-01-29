/**
 * Skeleton Card Component
 *
 * Example skeleton component that matches the dimensions and structure
 * of a typical Card component. Use this pattern for all feature components.
 *
 * @example
 * // In a component with loading state
 * if (loading) return <SkeletonCard />
 * return <Card>...</Card>
 */

import { Card, CardContent, CardHeader } from './card';
import { Skeleton } from './skeleton';

export function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>
    </Card>
  );
}
