import type { CollectionConfig } from 'payload';

export const JournalPosts: CollectionConfig = {
  slug: 'journal',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'publishedAt', 'updatedAt'],
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
    {
      name: 'category',
      type: 'text',
      admin: {
        description:
          'Free text, e.g. "Field notes". The Journal filter bar is built from whichever categories are actually in use.',
      },
    },
    {
      name: 'tag',
      type: 'text',
      admin: { description: 'Optional secondary tag shown above the title, e.g. a country.' },
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'body', type: 'richText' },
    {
      name: 'pullQuote',
      type: 'group',
      admin: { description: 'Optional pull-quote rendered halfway through the article body.' },
      fields: [
        { name: 'quote', type: 'textarea' },
        { name: 'attribution', type: 'text' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'External image URL fallback used until a Media file is uploaded.',
      },
    },
    { name: 'author', type: 'text' },
    {
      name: 'authorRole',
      type: 'text',
      admin: { description: 'e.g. "Head Guide" — shown beside the author name.' },
    },
    { name: 'publishedAt', type: 'date' },
    { name: 'readTime', type: 'text', admin: { description: 'e.g. "6 min read"' } },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Show this post in the large featured slot at the top of the Journal page. The most recent featured post wins.',
      },
    },
  ],
};
