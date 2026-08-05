import type { CollectionConfig } from 'payload';

export const TourThemes: CollectionConfig = {
  slug: 'tour-themes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'group', 'updatedAt'],
    description: 'Themed tour collections — landing pages at /tours/[slug] (Honeymoon, Schools, etc.).',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL slug — used in /tours/[slug].' },
    },
    {
      name: 'group',
      type: 'select',
      required: true,
      options: [
        { label: 'Special Interest', value: 'Special Interest' },
        { label: 'Groups', value: 'Groups' },
      ],
    },
    { name: 'tagline', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'hero', type: 'upload', relationTo: 'media' },
  ],
};
