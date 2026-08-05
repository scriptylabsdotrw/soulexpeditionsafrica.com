import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'attribution',
    defaultColumns: ['attribution', 'context', 'featured', 'updatedAt'],
    description: 'Guest quotes shown on the home page, Visit Rwanda, and other pages.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: { description: 'The pull-quote, no quote marks needed.' },
    },
    {
      name: 'attribution',
      type: 'text',
      required: true,
      admin: { description: 'Person name (e.g. "Priya Raman").' },
    },
    {
      name: 'context',
      type: 'text',
      admin: { description: 'E.g. "Gorilla Trekking · Rwanda · Mar 2025".' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional guest portrait.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show on the home page hero / featured slot.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
};
