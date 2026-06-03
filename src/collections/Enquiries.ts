import type { CollectionConfig } from 'payload';

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'destination', 'status', 'createdAt'],
    description: 'Configurator submissions from /contact. Public can create; only logged-in users can read/edit.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'travellers', type: 'text' },
    { name: 'dates', type: 'text' },
    { name: 'notes', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'destination', type: 'text', admin: { width: '33%' } },
        { name: 'tour', type: 'text', admin: { width: '33%' } },
        { name: 'tier', type: 'text', admin: { width: '33%' } },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'New',
      options: [
        { label: 'New', value: 'New' },
        { label: 'In progress', value: 'In progress' },
        { label: 'Replied', value: 'Replied' },
        { label: 'Closed', value: 'Closed' },
      ],
    },
  ],
};
