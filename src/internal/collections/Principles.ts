import type { CollectionConfig } from 'payload';

export const Principles: CollectionConfig = {
  slug: 'principles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'group', 'order'],
    description: 'Studio commitments / principles shown on Home and About.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
      admin: { description: 'Display number, e.g. "01".' },
    },
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    {
      name: 'group',
      type: 'select',
      required: true,
      defaultValue: 'both',
      options: [
        { label: 'Home page', value: 'home' },
        { label: 'About page', value: 'about' },
        { label: 'Both', value: 'both' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
};
