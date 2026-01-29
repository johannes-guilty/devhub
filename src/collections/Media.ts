import type { CollectionConfig } from 'payload';

/**
 * Media Collection - Image Uploads
 *
 * Handles image uploads for CMS content and page builder.
 * Uses sharp for image optimization and automatic resizing.
 *
 * WCAG Compliance: alt text is required for accessibility.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Image uploads for CMS content and page builder',
  },
  access: {
    // Public can read media (images are publicly accessible)
    read: () => true,
    // Only authenticated CMS users can upload
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    // Only admins can delete media
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Descriptive text for accessibility (WCAG requirement)',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Optional image caption',
      },
    },
  ],
  upload: {
    // Static files stored in media folder
    staticDir: 'media',
    // Allowed MIME types - images only
    mimeTypes: ['image/*'],
    // Image optimization with sharp
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'full',
        width: 1920,
        height: undefined, // Preserve aspect ratio
      },
    ],
    // Admin panel thumbnail preview
    adminThumbnail: 'thumbnail',
  },
};
