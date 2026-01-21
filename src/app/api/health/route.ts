/**
 * Health Check Endpoint
 *
 * Returns the current status of the application.
 * Used by:
 * - Vercel to verify deployment health
 * - Load balancers to route traffic
 * - Monitoring systems to check uptime
 *
 * @endpoint GET /api/health
 * @returns {{ status: string, timestamp: string }}
 */
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
