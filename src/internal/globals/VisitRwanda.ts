import type { GlobalConfig } from 'payload';

/* Everything on the /visit-rwanda page that isn't a Tour:
   the attractions directory, the "pillars" features, country facts,
   and the season-by-season guide. */

const imagePair = (label: string) => ({
  type: 'collapsible' as const,
  label,
  fields: [
    { name: 'image', type: 'upload' as const, relationTo: 'media' as const },
    {
      name: 'imageUrl',
      type: 'text' as const,
      admin: { description: 'External URL fallback if no Media file is uploaded.' },
    },
    {
      name: 'alt',
      type: 'text' as const,
      admin: { description: 'Describe the photo for screen readers and SEO.' },
    },
  ],
});

export const VisitRwanda: GlobalConfig = {
  slug: 'visit-rwanda',
  label: 'Visit Rwanda page',
  admin: {
    description:
      'Content for the /visit-rwanda page. Empty sections are hidden on the front-end.',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Attractions',
          description:
            'The directory of places, grouped by theme. Each theme becomes one block on the page.',
          fields: [
            {
              name: 'placeCategories',
              type: 'array',
              labels: { singular: 'Theme', plural: 'Themes' },
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  admin: { description: 'Small label above the title, e.g. "Theme · 01".' },
                },
                { name: 'title', type: 'text', required: true },
                { name: 'tagline', type: 'text' },
                { name: 'description', type: 'textarea' },
                imagePair('Photo'),
                {
                  name: 'places',
                  type: 'array',
                  labels: { singular: 'Place', plural: 'Places' },
                  admin: { initCollapsed: true },
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    {
                      name: 'location',
                      type: 'text',
                      admin: { description: 'e.g. "Musanze · Kigali"' },
                    },
                    { name: 'note', type: 'textarea' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Pillars',
          description: 'The large alternating feature blocks — gorillas, culture, and so on.',
          fields: [
            {
              name: 'pillars',
              type: 'array',
              labels: { singular: 'Pillar', plural: 'Pillars' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
                {
                  name: 'bullets',
                  type: 'array',
                  labels: { singular: 'Bullet', plural: 'Bullets' },
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
                imagePair('Photo'),
              ],
            },
          ],
        },
        {
          label: 'Country facts',
          description: 'The key/value table — capital, currency, visa, and so on.',
          fields: [
            {
              name: 'facts',
              type: 'array',
              labels: { singular: 'Fact', plural: 'Facts' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Seasons',
          description: 'The when-to-go guide.',
          fields: [
            {
              name: 'seasons',
              type: 'array',
              labels: { singular: 'Season', plural: 'Seasons' },
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'span',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "Jun – Sep"' },
                },
                { name: 'name', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
                {
                  name: 'best',
                  type: 'array',
                  label: 'Best for',
                  labels: { singular: 'Tag', plural: 'Tags' },
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
