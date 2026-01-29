import type { CollectionConfig } from 'payload';

/**
 * Users Collection - CMS Administrators
 *
 * DUAL-ORM STRATEGY NOTE:
 * This Payload `users` collection is for CMS administrators who access /admin.
 * It is SEPARATE from the Prisma `User` model which handles app users via Clerk (Story 1.4).
 *
 * - Payload Users: CMS admins, editors who manage content
 * - Prisma User: App users who create snippets, participate in discussions
 *
 * These are separate tables in the same PostgreSQL database and do NOT sync.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    // Description for learning purposes (NFR1)
    description:
      'CMS administrators with access to admin panel. NOT the same as app users (Prisma User).',
  },
  auth: true,
  fields: [
    // Email is added automatically by auth: true
    {
      name: 'displayName',
      type: 'text',
      label: 'Display Name',
      admin: {
        description: 'Optional display name for the admin user',
      },
    },
    {
      name: 'role',
      type: 'select',
      label: 'CMS Role',
      defaultValue: 'editor',
      required: true,
      // Include role in JWT for fast access checks without DB lookup
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        description: 'Admin has full access, Editor can only edit content',
      },
    },
  ],
  // Role-based access control
  access: {
    // All authenticated users can read
    read: ({ req: { user } }) => Boolean(user),
    // Only admins can create new users
    create: ({ req: { user } }) => user?.role === 'admin',
    // Users can update themselves, admins can update anyone
    update: ({ req: { user }, id }) => {
      if (user?.role === 'admin') return true;
      return user?.id === id;
    },
    // Only admins can delete
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
};
