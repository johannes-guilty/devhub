/**
 * Clerk Webhook Handler
 *
 * Handles webhook events from Clerk to synchronize user data with Prisma database.
 * Events handled:
 * - user.created: Creates a new User in Prisma
 * - user.updated: Updates existing User in Prisma
 * - user.deleted: Deletes User from Prisma
 *
 * @see https://clerk.com/docs/integrations/webhooks
 */
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { Role } from '@prisma/client';

/**
 * GET endpoint for testing webhook availability.
 * Returns status information about the webhook configuration.
 */
export async function GET() {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
  const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return Response.json({
    status: 'ok',
    endpoint: '/api/webhooks/clerk',
    webhookSecretConfigured: !!WEBHOOK_SECRET,
    clerkConfigured: !!(CLERK_SECRET_KEY && CLERK_PUBLISHABLE_KEY),
    message: WEBHOOK_SECRET
      ? 'Webhook secret is configured. Ready to receive events.'
      : 'Webhook secret not configured. For local testing, use ngrok/localtunnel and configure webhook in Clerk Dashboard',
    troubleshooting: {
      checkWebhookUrl: 'Verify webhook URL in Clerk Dashboard matches your tunnel URL (e.g., https://xxx.loca.lt/api/webhooks/clerk)',
      checkTunnel: 'Ensure localtunnel or ngrok is running and forwarding to port 3000',
      checkSecret: 'Verify CLERK_WEBHOOK_SECRET in .env.local matches the secret from Clerk Dashboard',
      testSignUp: 'Try creating a new user via /sign-up and watch terminal for webhook logs',
    },
    instructions: {
      local: [
        '1. Start localtunnel: npx localtunnel --port 3000',
        '2. Copy the tunnel URL (e.g., https://xxx.loca.lt)',
        '3. In Clerk Dashboard → Developers → Instance → Webhooks, add endpoint: https://xxx.loca.lt/api/webhooks/clerk',
        '4. Select events: user.created, user.updated, user.deleted',
        '5. Copy Signing Secret and add to .env.local as CLERK_WEBHOOK_SECRET',
        '6. Restart dev server: pnpm dev',
        '7. Test by creating a new user via /sign-up',
      ],
      production: 'Configure webhook in Clerk Dashboard with production endpoint URL',
    },
  });
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  // Log all incoming requests for debugging
  console.log('[CLERK WEBHOOK] ========================================');
  console.log('[CLERK WEBHOOK] POST request received at:', new Date().toISOString());
  console.log('[CLERK WEBHOOK] URL:', req.url);
  
  if (!WEBHOOK_SECRET) {
    console.error('[CLERK WEBHOOK] ❌ CLERK_WEBHOOK_SECRET not configured');
    console.error('[CLERK WEBHOOK] For local testing, use ngrok or localtunnel and configure webhook in Clerk Dashboard');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  console.log('[CLERK WEBHOOK] ✅ Webhook secret is configured');

  // Get Svix headers for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // Log all headers for debugging
  const allHeaders: Record<string, string | null> = {};
  headerPayload.forEach((value, key) => {
    allHeaders[key] = value;
  });
  console.log('[CLERK WEBHOOK] All headers:', Object.keys(allHeaders));
  console.log('[CLERK WEBHOOK] Svix headers:', { 
    'svix-id': svix_id, 
    'svix-timestamp': svix_timestamp, 
    'svix-signature': svix_signature ? 'present' : 'missing' 
  });

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('[CLERK WEBHOOK] ❌ Missing svix headers');
    console.error('[CLERK WEBHOOK] This might be a test request or the request is not from Clerk');
    console.error('[CLERK WEBHOOK] All headers:', allHeaders);
    return new Response('Missing svix headers', { status: 400 });
  }

  // Get the request body
  let payload: unknown;
  try {
    payload = await req.json();
    console.log('[CLERK WEBHOOK] Request body received, type:', typeof payload);
  } catch (error) {
    console.error('[CLERK WEBHOOK] ❌ Failed to parse request body:', error);
    return new Response('Invalid request body', { status: 400 });
  }
  
  const body = JSON.stringify(payload);

  // Verify the webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('[CLERK WEBHOOK] ❌ Webhook verification failed:', err);
    if (err instanceof Error) {
      console.error('[CLERK WEBHOOK] Error details:', err.message, err.stack);
    }
    return new Response('Invalid signature', { status: 400 });
  }

  const eventType = evt.type;
  console.log(`[CLERK WEBHOOK] ✅ Event verified: ${eventType}`);

  try {
    // Handle user.created event
    if (eventType === 'user.created') {
      const { id, email_addresses, username, first_name, last_name, image_url, public_metadata } =
        evt.data;

      // Map role from Clerk metadata to Prisma Role enum
      const metadataRole = public_metadata?.role as string | undefined;
      const role: Role = mapClerkRoleToPrisma(metadataRole);

      // Generate username from Clerk data
      const generatedUsername = generateUsername(username, email_addresses[0]?.email_address, id);

      await db.user.create({
        data: {
          id,
          email: email_addresses[0]?.email_address ?? '',
          username: generatedUsername,
          displayName: formatDisplayName(first_name, last_name),
          avatarUrl: image_url ?? null,
          role,
        },
      });

      console.log(`[CLERK WEBHOOK] ✅ User created in Prisma: ${id} (${generatedUsername})`);
      console.log('[CLERK WEBHOOK] ========================================');
    }

    // Handle user.updated event
    if (eventType === 'user.updated') {
      const { id, email_addresses, username, first_name, last_name, image_url, public_metadata } =
        evt.data;

      // Map role from Clerk metadata to Prisma Role enum
      const metadataRole = public_metadata?.role as string | undefined;
      const role: Role | undefined = metadataRole ? mapClerkRoleToPrisma(metadataRole) : undefined;

      await db.user.update({
        where: { id },
        data: {
          email: email_addresses[0]?.email_address,
          username: username ?? undefined,
          displayName: formatDisplayName(first_name, last_name) || undefined,
          avatarUrl: image_url ?? undefined,
          ...(role && { role }),
        },
      });

      console.log(`[CLERK WEBHOOK] ✅ User updated in Prisma: ${id}`);
      console.log('[CLERK WEBHOOK] ========================================');
    }

    // Handle user.deleted event
    if (eventType === 'user.deleted') {
      const { id } = evt.data;

      if (id) {
        await db.user.delete({ where: { id } });
        console.log(`[CLERK WEBHOOK] ✅ User deleted from Prisma: ${id}`);
        console.log('[CLERK WEBHOOK] ========================================');
      }
    }

    console.log('[CLERK WEBHOOK] ✅ Webhook processed successfully');
    console.log('[CLERK WEBHOOK] ========================================');
    return new Response('Webhook processed', { status: 200 });
  } catch (error) {
    console.error('[CLERK WEBHOOK] ❌ Webhook processing error:', error);
    if (error instanceof Error) {
      console.error('[CLERK WEBHOOK] Error details:', error.message, error.stack);
    }
    console.log('[CLERK WEBHOOK] ========================================');
    return new Response('Webhook processing failed', { status: 500 });
  }
}

/**
 * Maps Clerk role metadata to Prisma Role enum.
 * Defaults to MEMBER if no role or unknown role is specified.
 */
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

/**
 * Generates a username from available Clerk data.
 * Priority: username > email prefix > user_id suffix
 */
function generateUsername(
  username: string | null | undefined,
  email: string | undefined,
  userId: string
): string {
  if (username) {
    return username;
  }

  if (email) {
    // Use email prefix (before @) as username
    const emailPrefix = email.split('@')[0] ?? 'user';
    // Sanitize: only alphanumeric and underscores, max 20 chars
    return emailPrefix.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 20);
  }

  // Fallback: use last 8 chars of user ID
  return `user_${userId.slice(-8)}`;
}

/**
 * Formats display name from first and last name.
 * Returns 'Anonymous' if no name provided.
 */
function formatDisplayName(firstName: string | null, lastName: string | null): string {
  const parts = [firstName, lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : 'Anonymous';
}
