import type { GlobalConfig } from 'payload';

/* Single editable record for site-wide singletons:
   hero stats, studio contact info, founder copy. */

export const SiteContent: GlobalConfig = {
  slug: 'site-content',
  admin: {
    description:
      'Site-wide singletons. Edit once, render everywhere. Empty fields are hidden on the front-end.',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero images',
          description:
            'Override the default hero/background image on each page. Upload a Media file for best results, or paste an external URL.',
          fields: [
            {
              type: 'collapsible',
              label: 'Home — homepage hero',
              fields: [
                {
                  name: 'homeHeroImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Preferred over the URL fallback.' },
                },
                {
                  name: 'homeHeroImageUrl',
                  type: 'text',
                  admin: { description: 'External URL fallback if no Media is uploaded.' },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'About — page hero',
              fields: [
                { name: 'aboutHeroImage', type: 'upload', relationTo: 'media' },
                { name: 'aboutHeroImageUrl', type: 'text' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Visit Rwanda — page hero',
              fields: [
                { name: 'visitRwandaHeroImage', type: 'upload', relationTo: 'media' },
                { name: 'visitRwandaHeroImageUrl', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Home hero stats',
          description:
            'Numbers shown in the home / destinations ribbon. Leave any field empty to hide it.',
          fields: [
            { name: 'foundedYear', type: 'text' },
            { name: 'countries', type: 'text' },
            { name: 'travellersHosted', type: 'text' },
            { name: 'curatedLodges', type: 'text' },
          ],
        },
        {
          label: 'Visit Rwanda stats',
          description: 'Numbers shown in the Visit Rwanda hero strip.',
          fields: [
            { name: 'mountainGorillas', type: 'text' },
            { name: 'gorillaFamilies', type: 'text' },
            { name: 'nationalParks', type: 'text' },
            { name: 'hills', type: 'text' },
          ],
        },
        {
          label: 'Studio contact',
          fields: [
            { name: 'studioAddress', type: 'text' },
            { name: 'studioEmail', type: 'email' },
            { name: 'studioPhone', type: 'text' },
            { name: 'studioHours', type: 'text' },
            { name: 'studioMapsUrl', type: 'text', admin: { description: 'Google Maps URL.' } },
          ],
        },
        {
          label: 'About copy',
          fields: [
            {
              name: 'aboutManifesto',
              type: 'textarea',
              admin: {
                description:
                  'Single big paragraph shown in the About manifesto section. Plain text.',
              },
            },
            {
              name: 'studioBlurb',
              type: 'textarea',
              admin: { description: 'Short studio paragraph for the About HQ block.' },
            },
          ],
        },
      ],
    },
  ],
};
