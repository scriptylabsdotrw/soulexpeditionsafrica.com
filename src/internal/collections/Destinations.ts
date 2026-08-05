import type { CollectionConfig } from 'payload';

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'updatedAt'],
    description: 'Countries / territories — the top level of the destination tree.',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL slug — used in /destinations/[slug].' },
    },
    { name: 'tagline', type: 'text' },
    {
      name: 'region',
      type: 'select',
      required: true,
      options: [
        { label: 'East Africa', value: 'East Africa' },
        { label: 'Southern Africa', value: 'Southern Africa' },
        { label: 'Indian Ocean', value: 'Indian Ocean' },
        { label: 'North Africa', value: 'North Africa' },
        { label: 'West Africa', value: 'West Africa' },
      ],
    },
    { name: 'bestTime', type: 'text', label: 'Best time to visit' },
    { name: 'description', type: 'textarea' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Card / index thumbnail. Preferred over imageUrl.' },
    },
    {
      name: 'hero',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Full-bleed hero image. Preferred over heroUrl.' },
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'External image URL fallback used until a Media file is uploaded.',
      },
    },
    {
      name: 'heroUrl',
      type: 'text',
      admin: {
        description: 'External hero URL fallback used until a Media file is uploaded.',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      labels: { singular: 'Highlight', plural: 'Highlights' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'signatureLodges',
      type: 'array',
      labels: { singular: 'Lodge', plural: 'Signature lodges' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
  ],
};
