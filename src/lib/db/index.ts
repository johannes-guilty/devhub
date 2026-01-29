// lib/db/index.ts
// Prisma Client singleton for DevHub app-specific data
// Prevents "Too many database connections" error in development due to hot reload

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Extend globalThis to hold Prisma Client instance across hot reloads
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Create Prisma Client with PostgreSQL adapter (Prisma 7 requirement)
 *
 * Uses @prisma/adapter-pg for direct database connection via node-postgres (pg)
 */
function createPrismaClient(): PrismaClient {
  // Create PostgreSQL adapter with connection string from environment
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}

/**
 * Prisma Client singleton instance
 *
 * In development: Reuses existing client to prevent connection exhaustion
 * In production: Creates a new client (single instance per serverless function)
 */
export const db = globalForPrisma.prisma ?? createPrismaClient()

// Store client in globalThis for hot reload persistence (development only)
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

// Re-export Prisma types for convenience
export type { User, Role } from '@prisma/client'
export { Role as UserRole } from '@prisma/client'
