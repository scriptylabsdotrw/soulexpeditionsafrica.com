import type { CollectionConfig } from 'payload';

export const Milestones: CollectionConfig = {
  slug: 'milestones',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['year', 'title', 'order'],
    description: 'Studio timeline entries shown on the About page.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'year',
      type: 'text',
      required: true,
      admin: { description: 'Display year, e.g. "2018".' },
    },
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
};
