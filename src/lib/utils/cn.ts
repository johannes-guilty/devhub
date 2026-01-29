import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind merge for proper class conflict resolution.
 * This is the standard utility used by shadcn/ui components.
 *
 * @example
 * cn('px-2 py-1', 'px-4') // Returns: 'py-1 px-4' (px-2 is overridden by px-4)
 * cn('base-class', isActive && 'active-class')
 *
 * @param inputs - Class names, conditional classes, or class objects
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
