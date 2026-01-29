/**
 * Manual User Sync Endpoint
 *
 * This endpoint manually syncs the current Clerk user to Prisma.
 * Use this if webhook hasn't created the user yet.
 *
 * GET /api/sync-user - Syncs current user
 */
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { Role } from '@prisma/client';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get Clerk user data first
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return Response.json({ error: 'Could not fetch Clerk user data' }, { status: 500 });
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress ?? '';

    // Check if user already exists by ID
    let existingUser = await db.user.findUnique({ where: { id: userId } });

    if (existingUser) {
      // User exists with this ID - return it
      return Response.json({
        success: true,
        message: 'User already exists in database',
        user: {
          id: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
          displayName: existingUser.displayName,
        },
      });
    }

    // Check if user exists by email (different Clerk ID scenario)
    if (email) {
      existingUser = await db.user.findUnique({ where: { email } });
      
      if (existingUser) {
        // User exists with this email but different ID - update the ID
        const updatedUser = await db.user.update({
          where: { id: existingUser.id },
          data: { id: userId }, // Update to match current Clerk ID
        });

        return Response.json({
          success: true,
          message: 'User ID updated to match current Clerk session',
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            username: updatedUser.username,
            displayName: updatedUser.displayName,
          },
        });
      }
    }

    // Map role from Clerk metadata
    const metadataRole = clerkUser.publicMetadata?.role as string | undefined;
    const role: Role = mapClerkRoleToPrisma(metadataRole);

    // Generate username
    const generatedUsername = generateUsername(
      clerkUser.username,
      email,
      userId
    );

    // Create user in Prisma
    // Use upsert to handle race conditions
    const newUser = await db.user.upsert({
      where: { id: userId },
      update: {
        // Update if somehow user was created between checks
        email,
        username: generatedUsername,
        displayName: formatDisplayName(clerkUser.firstName, clerkUser.lastName),
        avatarUrl: clerkUser.imageUrl ?? null,
        ...(metadataRole && { role }),
      },
      create: {
        id: userId,
        email,
        username: generatedUsername,
        displayName: formatDisplayName(clerkUser.firstName, clerkUser.lastName),
        avatarUrl: clerkUser.imageUrl ?? null,
        role,
      },
    });

    return Response.json({
      success: true,
      message: 'User synced successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        displayName: newUser.displayName,
      },
    });
  } catch (error) {
    console.error('[SYNC USER] Error:', error);
    return Response.json(
      {
        error: 'Failed to sync user',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

function mapClerkRoleToPrisma(role: string | undefined): Role {
  switch (role?.toLowerCase()) {
    case 'admin':
      return 'ADMIN';
    case 'moderator':
      return 'MODERATOR';
    case 'guest':
      return 'GUEST';
    default:
      return 'MEMBER';
  }
}

function generateUsername(
  username: string | null | undefined,
  email: string | undefined,
  userId: string
): string {
  if (username) {
    return username;
  }

  if (email) {
    const emailPrefix = email.split('@')[0] ?? 'user';
    return emailPrefix.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 20);
  }

  return `user_${userId.slice(-8)}`;
}

function formatDisplayName(firstName: string | null, lastName: string | null): string {
  const parts = [firstName, lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : 'Anonymous';
}
