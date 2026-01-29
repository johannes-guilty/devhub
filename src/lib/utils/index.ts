/**
 * Utility functions for the DevHub application.
 *
 * This file exports commonly used helper functions that are shared
 * across the application. Add new utilities here as the project grows.
 *
 * @module lib/utils
 */

// Re-export auth utilities
export {
  AuthError,
  getCurrentUser,
  requireUser,
  requireRole,
  canEdit,
  canEditOrModerate,
  isAdmin,
  isModerator,
} from './auth';

// Re-export cn utility for convenience
export { cn } from './cn';
