/**
 * Sidebar Component
 *
 * Sidebar navigation shell component.
 * Can be expanded in future stories with additional navigation items.
 */

'use client';

import { cn } from '@/lib/utils/cn';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'hidden lg:block w-64 border-r border-border bg-background p-4',
        className
      )}
    >
      <div className="space-y-4">
        {/* Sidebar content will be added in future stories */}
        <div className="text-sm text-muted-foreground">
          Sidebar navigation coming soon...
        </div>
      </div>
    </aside>
  );
}
