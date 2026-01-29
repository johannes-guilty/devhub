import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { MainLayout } from '@/components/layout/main-layout';
import './styles.css';

export const metadata = {
  description: 'DevHub - A developer community platform for sharing code, discussions, and challenges.',
  title: 'DevHub',
};

/**
 * Clerk appearance configuration for DevHub dark theme.
 * Customizes Clerk's components to match our design system.
 */
const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: '#3b82f6', // DevHub primary blue
    colorBackground: '#09090b', // DevHub background
    colorInputBackground: '#111318', // DevHub elevated background
    colorText: '#f8fafc', // DevHub foreground
    colorTextSecondary: '#94a3b8', // DevHub muted foreground
    borderRadius: '0.375rem', // rounded-md (6px)
  },
  elements: {
    card: 'bg-background-elevated border border-border',
    formButtonPrimary: 'bg-primary hover:bg-primary-hover',
  },
};

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" className="dark">
        <body>
          <MainLayout>{children}</MainLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
