/**
 * Authentication Utility Functions
 *
 * Provides helper functions for authentication and authorization.
 * Uses Clerk for auth state and Prisma for user data.
 *
 * @module lib/utils/auth
 */
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import type { Role, User } from '@prisma/client';

/**
 * Custom error class for authentication/authorization errors.
 * Includes HTTP status code for API responses.
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 401
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Gets the current authenticated user from the database.
 * Returns null if no user is authenticated or user not found in database.
 *
 * @example
 * const user = await getCurrentUser();
 * if (user) {
 *   console.log(`Welcome, ${user.displayName}!`);
 * }
 */
export async function getCurrentUser(): Promise<User | null> {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  return db.user.findUnique({ where: { id: userId } });
}

/**
 * Gets the current user or throws an AuthError if not authenticated.
 * Use this in protected routes/actions that require authentication.
 *
 * @throws {AuthError} When user is not authenticated (401)
 *
 * @example
 * const user = await requireUser();
 * // user is guaranteed to exist here
 * await createPost({ authorId: user.id, ... });
 */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    throw new AuthError('Unauthorized - Please sign in', 401);
  }

  return user;
}

/**
 * Gets the current user and verifies they have one of the allowed roles.
 * Use this in routes/actions that require specific permissions.
 *
 * @param allowedRoles - Array of roles that are allowed access
 * @throws {AuthError} When user is not authenticated (401)
 * @throws {AuthError} When user doesn't have required role (403)
 *
 * @example
 * // Only admins can delete users
 * const admin = await requireRole(['ADMIN']);
 *
 * // Moderators and admins can moderate content
 * const moderator = await requireRole(['MODERATOR', 'ADMIN']);
 */
export async function requireRole(allowedRoles: Role[]): Promise<User> {
  const user = await requireUser();

  if (!allowedRoles.includes(user.role)) {
    throw new AuthError('Forbidden - Insufficient permissions', 403);
  }

  return user;
}

/**
 * Checks if a user can edit a resource (i.e., they are the author).
 * Useful for checking ownership before allowing edit/delete operations.
 *
 * @param user - The current user (or null if not authenticated)
 * @param resourceAuthorId - The ID of the resource's author
 * @returns true if the user can edit the resource
 *
 * @example
 * const user = await getCurrentUser();
 * if (canEdit(user, snippet.authorId)) {
 *   // Show edit button
 * }
 */
export function canEdit(user: { id: string } | null, resourceAuthorId: string): boolean {
  if (!user) {
    return false;
  }

  return user.id === resourceAuthorId;
}

/**
 * Checks if a user can edit a resource OR has admin/moderator privileges.
 * Admins and moderators can edit any content for moderation purposes.
 *
 * @param user - The current user (or null if not authenticated)
 * @param resourceAuthorId - The ID of the resource's author
 * @returns true if the user can edit the resource
 *
 * @example
 * const user = await getCurrentUser();
 * if (canEditOrModerate(user, post.authorId)) {
 *   // Show edit/delete buttons
 * }
 */
export function canEditOrModerate(
  user: { id: string; role: Role } | null,
  resourceAuthorId: string
): boolean {
  if (!user) {
    return false;
  }

  // Admins and moderators can edit any content
  if (user.role === 'ADMIN' || user.role === 'MODERATOR') {
    return true;
  }

  // Otherwise, only the author can edit
  return user.id === resourceAuthorId;
}

/**
 * Checks if the current user is an admin.
 *
 * @param user - The user to check
 * @returns true if the user is an admin
 */
export function isAdmin(user: { role: Role } | null): boolean {
  return user?.role === 'ADMIN';
}

/**
 * Checks if the current user is a moderator or admin.
 *
 * @param user - The user to check
 * @returns true if the user is a moderator or admin
 */
export function isModerator(user: { role: Role } | null): boolean {
  return user?.role === 'MODERATOR' || user?.role === 'ADMIN';
}
