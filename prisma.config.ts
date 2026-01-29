// prisma.config.ts
// Prisma 7 configuration file for database connections
// See: https://www.prisma.io/docs/orm/reference/prisma-config-reference

import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  // Schema file location
  schema: 'prisma/schema.prisma',

  // Datasource configuration (required for migrations)
  // Uses DATABASE_URL for all operations (Neon pooled connection works for both)
  datasource: {
    url: env('DATABASE_URL'),
  },
})
