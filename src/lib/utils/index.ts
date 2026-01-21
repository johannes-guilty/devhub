/**
 * Utility functions for the DevHub application.
 *
 * This file exports commonly used helper functions that are shared
 * across the application. Add new utilities here as the project grows.
 *
 * @module lib/utils
 */

/**
 * Combines class names conditionally.
 * Useful for dynamic Tailwind CSS classes.
 *
 * @example
 * cn('base-class', isActive && 'active-class', 'always-applied')
 * // Returns: 'base-class active-class always-applied' (if isActive is true)
 *
 * @param classes - Class names or falsy values to filter out
 * @returns Combined class string
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
