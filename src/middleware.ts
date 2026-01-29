/**
 * Clerk Authentication Middleware for DevHub
 *
 * This middleware protects routes that require authentication.
 * Public routes are accessible without login, all others require auth.
 *
 * @see https://clerk.com/docs/references/nextjs/clerk-middleware
 */
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/**
 * Routes that are accessible without authentication.
 * All other routes will require the user to be signed in.
 */
const isPublicRoute = createRouteMatcher([
  '/', // Landing page
  '/sign-in(.*)', // Sign in page and Clerk routes
  '/sign-up(.*)', // Sign up page and Clerk routes
  '/api/health', // Health check endpoint
  '/api/webhooks/(.*)', // Webhook endpoints (Clerk, etc.)
]);

export default clerkMiddleware(async (auth, request) => {
  // If the route is not public, require authentication
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  /**
   * Matcher configuration to run middleware on specific routes.
   * Excludes static files, images, and other assets.
   */
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
