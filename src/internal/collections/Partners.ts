import type { CollectionConfig } from 'payload';

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'order', 'updatedAt'],
    description: 'Lodge / camp / industry partners shown in the home marquee.',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Logo image (transparent PNG preferred).' },
    },
    {
      name: 'logoUrl',
      type: 'text',
      admin: { description: 'Fallback URL if no Media file is uploaded.' },
    },
    {
      name: 'url',
      type: 'text',
      admin: { description: 'Optional link to the partner site.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
};
