/**
 * Sign Up Layout
 *
 * Provides ClerkProvider context for the sign-up page.
 * Separate from (frontend) layout to avoid nested layouts.
 */
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

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

export const metadata = {
  title: 'Sign Up - DevHub',
  description: 'Create your DevHub account',
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
