import type { CollectionConfig } from 'payload';

export const JournalPosts: CollectionConfig = {
  slug: 'journal',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
    description: 'Field journal — long-form articles, dispatches, and lodge briefings.',
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
    },
    { name: 'category', type: 'text' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'External image URL fallback used until a Media file is uploaded.',
      },
    },
    { name: 'author', type: 'text' },
    { name: 'publishedAt', type: 'date' },
    { name: 'readTime', type: 'text', admin: { description: 'e.g. "6 min read"' } },
  ],
};
