/**
 * Sign Up Page
 *
 * Renders Clerk's SignUp component with DevHub styling.
 * Uses catch-all route [[...sign-up]] to handle Clerk's internal routes.
 *
 * @see https://clerk.com/docs/components/authentication/sign-up
 */
import { SignUp } from '@clerk/nextjs';
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
  elements: {
    rootBox: 'mx-auto',
    card: 'shadow-2xl',
    headerTitle: 'text-2xl font-bold',
    headerSubtitle: 'text-sm text-gray-400',
    socialButtonsBlockButton: 'border-gray-700 hover:bg-gray-800',
    formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
    footerActionLink: 'text-blue-400 hover:text-blue-300',
  },
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4 py-12">
      <div className="w-full max-w-md">
        <SignUp
          appearance={clerkAppearance}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/home"
        />
      </div>
    </div>
  );
}
