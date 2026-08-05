import type { CollectionConfig } from 'payload';

export const PressFeatures: CollectionConfig = {
  slug: 'press-features',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'order', 'updatedAt'],
    description: 'Publications that have featured Soul Expeditions Africa.',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'url', type: 'text', admin: { description: 'Link to the article (optional).' } },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
};
