/**
 * Main Layout Component
 *
 * Composes Header, Sidebar, and Footer into a complete layout.
 * Used to wrap all frontend routes.
 */

import { Header } from './header';
import { Footer } from './footer';
import { Sidebar } from './sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
