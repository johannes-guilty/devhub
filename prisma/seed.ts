// prisma/seed.ts
// Database seeding script for development/testing
// Run with: pnpm db:seed

import 'dotenv/config'
import { PrismaClient, Role } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Prisma 7 requires adapter for database connection
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Test users for development - covers all roles
  const users = [
    {
      id: 'test_admin_001',
      email: 'admin@devhub.local',
      username: 'admin',
      displayName: 'Admin User',
      role: Role.ADMIN,
      bio: 'Platform administrator for testing',
      points: 1000,
    },
    {
      id: 'test_moderator_001',
      email: 'moderator@devhub.local',
      username: 'moderator',
      displayName: 'Moderator User',
      role: Role.MODERATOR,
      bio: 'Content moderator for testing',
      points: 500,
    },
    {
      id: 'test_member_001',
      email: 'member@devhub.local',
      username: 'testuser',
      displayName: 'Test Member',
      role: Role.MEMBER,
      bio: 'A regular member for testing',
      points: 100,
    },
    {
      id: 'test_member_002',
      email: 'newbie@devhub.local',
      username: 'newbie',
      displayName: 'New Developer',
      role: Role.MEMBER,
      bio: 'Just getting started with coding!',
      points: 0,
    },
  ]

  for (const user of users) {
    const created = await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    })
    console.log(`  ✓ User: ${created.username} (${created.role})`)
  }

  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
