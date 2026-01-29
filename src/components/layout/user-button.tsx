/**
 * UserButton Component
 *
 * Wraps Clerk's UserButton component with DevHub styling.
 * Shows user avatar with dropdown menu for profile and sign-out.
 *
 * @example
 * // In header component
 * <UserButton />
 */
'use client';

import { UserButton as ClerkUserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

/**
 * Clerk appearance configuration for DevHub dark theme.
 */
const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: '#3b82f6',
    colorBackground: '#09090b',
    colorInputBackground: '#111318',
    colorText: '#f8fafc',
    colorTextSecondary: '#94a3b8',
    borderRadius: '0.375rem',
  },
};

/**
 * UserButton component that displays user avatar and menu when signed in,
 * or a sign-in button when signed out.
 */
export function UserButton() {
  return (
    <>
      <SignedIn>
        <ClerkUserButton
          appearance={clerkAppearance}
          afterSignOutUrl="/"
          userProfileMode="modal"
        />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}

/**
 * Compact UserButton for mobile or space-constrained layouts.
 */
export function UserButtonCompact() {
  return (
    <>
      <SignedIn>
        <ClerkUserButton
          appearance={{
            ...clerkAppearance,
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
          afterSignOutUrl="/"
        />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
