/**
 * Home Page
 *
 * Protected route that shows after successful sign-in.
 * This is the main landing page for authenticated users.
 */
import { getCurrentUser } from '@/lib/utils/auth';
import { UserButton } from '@/components/layout/user-button';
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function HomePage() {
  const user = await getCurrentUser();
  const { userId } = await auth();
  const clerkUser = userId ? await currentUser() : null;

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to DevHub</h1>
          <UserButton />
        </div>

        {user ? (
          <div className="space-y-6">
            <div className="bg-[#111318] rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Welcome back, {user.displayName}!</h2>
              <div className="space-y-2 text-gray-400">
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
                <p>Role: {user.role}</p>
                <p>Points: {user.points}</p>
              </div>
            </div>

            <div className="bg-[#111318] rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <p className="text-gray-400">More features coming soon...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#111318] rounded-lg p-6 border border-gray-800 space-y-4">
            <p className="text-red-400 font-semibold">⚠️ User not found in database</p>
            <div className="text-sm text-gray-400 space-y-2">
              <p>You are authenticated in Clerk, but your user hasn&apos;t been synced to the database yet.</p>
              {userId && (
                <div className="mt-4 p-4 bg-gray-900 rounded border border-gray-700">
                  <p className="text-xs font-mono text-gray-500">Clerk User ID: {userId}</p>
                  {clerkUser && (
                    <>
                      <p className="text-xs font-mono text-gray-500 mt-2">Email: {clerkUser.emailAddresses[0]?.emailAddress}</p>
                      <p className="text-xs font-mono text-gray-500">Name: {clerkUser.firstName} {clerkUser.lastName}</p>
                    </>
                  )}
                </div>
              )}
              <div className="mt-4 p-4 bg-blue-900/20 rounded border border-blue-700">
                <p className="text-blue-300 font-semibold mb-2">How to fix:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs text-blue-200">
                  <li>Click the button below to manually sync your user</li>
                  <li>Or check if webhook is receiving events (look for logs in terminal)</li>
                  <li>Or manually create user in Prisma Studio with Clerk User ID above</li>
                </ol>
                <div className="mt-4">
                  <form action="/api/sync-user" method="GET">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
                    >
                      Sync User Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
