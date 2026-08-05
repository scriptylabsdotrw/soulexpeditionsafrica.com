import type { CollectionConfig } from 'payload';

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'destination', 'duration', 'updatedAt'],
    description: 'Every tour we run — linked to a destination and optionally tagged with themes.',
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
      admin: { description: 'URL slug — used in /destinations/[country]/tours/[slug].' },
    },
    {
      name: 'destination',
      type: 'relationship',
      relationTo: 'destinations',
      required: true,
    },
    { name: 'duration', type: 'text', required: true },
    {
      name: 'pace',
      type: 'select',
      options: [
        { label: 'Easy', value: 'Easy' },
        { label: 'Moderate', value: 'Moderate' },
        { label: 'Active', value: 'Active' },
        { label: 'Expedition', value: 'Expedition' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Wildlife', value: 'Wildlife' },
        { label: 'Cultural', value: 'Cultural' },
        { label: 'Adventure', value: 'Adventure' },
        { label: 'Coast', value: 'Coast' },
        { label: 'Trekking', value: 'Trekking' },
      ],
    },
    { name: 'group', type: 'text', label: 'Group size hint', admin: { description: 'e.g. "Private · max 6"' } },
    { name: 'summary', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    { name: 'bestTime', type: 'text', label: 'Best time' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'External image URL fallback used until a Media file is uploaded.',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      labels: { singular: 'Highlight', plural: 'Highlights' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'itinerary',
      type: 'array',
      labels: { singular: 'Day', plural: 'Itinerary days' },
      admin: { description: 'Day-by-day breakdown shown on the tour detail page.' },
      fields: [
        { name: 'day', type: 'text', required: true, admin: { description: 'e.g. "Day 1" or "Days 3–4".' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'themes',
      type: 'relationship',
      relationTo: 'tour-themes',
      hasMany: true,
      admin: { description: 'Themed collections this tour appears in (Honeymoon, Schools, etc.).' },
    },
    {
      name: 'tiers',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Luxury', value: 'Luxury' },
        { label: 'Mid range', value: 'Mid range' },
        { label: 'Budget', value: 'Budget' },
      ],
      defaultValue: ['Luxury', 'Mid range', 'Budget'],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this tour in the "Signature expeditions" row on the homepage.',
      },
    },
  ],
};
