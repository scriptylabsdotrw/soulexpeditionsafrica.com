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
            {
              type: 'collapsible',
              label: 'Contact — page hero',
              fields: [
                { name: 'contactHeroImage', type: 'upload', relationTo: 'media' },
                { name: 'contactHeroImageUrl', type: 'text' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Journal — page hero',
              fields: [
                { name: 'journalHeroImage', type: 'upload', relationTo: 'media' },
                { name: 'journalHeroImageUrl', type: 'text' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Home — section imagery',
              admin: {
                description:
                  'Photographs used inside the homepage sections. Each falls back to its URL field if no Media file is set.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'homeStoryImage', type: 'upload', relationTo: 'media' },
                    {
                      name: 'homeStoryImageUrl',
                      type: 'text',
                      label: 'Story image URL',
                    },
                  ],
                },
                {
                  name: 'homeGallery',
                  type: 'array',
                  labels: { singular: 'Gallery image', plural: 'Gallery images' },
                  maxRows: 3,
                  admin: { description: 'Three-up Rwanda spotlight gallery.' },
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media' },
                    { name: 'imageUrl', type: 'text' },
                    { name: 'alt', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'homeCtaImage', type: 'upload', relationTo: 'media' },
                    { name: 'homeCtaImageUrl', type: 'text', label: 'Closing CTA image URL' },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Home — rotating hero images',
              admin: {
                description:
                  'The homepage hero cross-fades through these in order. Add at least one.',
              },
              fields: [
                {
                  name: 'homeHeroSlides',
                  type: 'array',
                  labels: { singular: 'Slide', plural: 'Slides' },
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media' },
                    { name: 'imageUrl', type: 'text' },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'place',
                          type: 'text',
                          admin: { description: 'Caption, e.g. "Volcanoes National Park".' },
                        },
                        {
                          name: 'country',
                          type: 'text',
                          admin: { description: 'Small orange label above it, e.g. "Rwanda".' },
                        },
                      ],
                    },
                  ],
                },
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
            {
              name: 'aboutStory',
              type: 'array',
              label: 'Our story',
              labels: { singular: 'Paragraph', plural: 'Paragraphs' },
              admin: { description: 'The long-form story section. One entry per paragraph.' },
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            {
              type: 'collapsible',
              label: 'Studio / HQ photo',
              fields: [
                { name: 'aboutStudioImage', type: 'upload', relationTo: 'media' },
                { name: 'aboutStudioImageUrl', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Brand & footer',
          description: 'Company name, footer copy, and the small print at the bottom of every page.',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              admin: { description: 'Used in the copyright line and image alt text.' },
            },
            {
              name: 'footerBlurb',
              type: 'textarea',
              admin: { description: 'Paragraph beside the logo in the footer.' },
            },
            {
              name: 'footerTagline',
              type: 'text',
              admin: { description: 'Small line at the far right of the footer bar.' },
            },
          ],
        },
        {
          label: 'Social & messaging',
          description:
            'Social profiles and the floating WhatsApp button. Leave the social list empty to hide the icons entirely.',
          fields: [
            {
              name: 'socialHandle',
              type: 'text',
              admin: { description: 'Shown as "Follow · @handle" above the footer icons.' },
            },
            {
              name: 'socials',
              type: 'array',
              labels: { singular: 'Profile', plural: 'Profiles' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'X', value: 'x' },
                    { label: 'LinkedIn', value: 'linkedin' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  admin: { description: 'Full profile URL, including https://' },
                },
              ],
            },
            {
              name: 'whatsappNumber',
              type: 'text',
              admin: {
                description:
                  'Digits only, in international format (e.g. 250783140000). Leave empty to hide the floating WhatsApp button.',
              },
            },
            {
              name: 'whatsappMessage',
              type: 'textarea',
              admin: { description: 'Pre-filled message when someone taps the WhatsApp button.' },
            },
          ],
        },
        {
          label: 'Header menu',
          description:
            'Primary nav items, plus the two large promo cards in the "Tours" mega-menu. The link columns beside them are built automatically from the Tour Themes collection.',
          fields: [
            {
              name: 'headerNav',
              type: 'array',
              labels: { singular: 'Nav item', plural: 'Nav items' },
              admin: {
                description:
                  'Order here is the order in the header. Tick "mega-menu" on the item that should open the Tours panel.',
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                {
                  name: 'href',
                  type: 'text',
                  admin: {
                    description: 'Ignored for the mega-menu item.',
                    condition: (_, siblingData) => !siblingData?.isMegaMenu,
                  },
                },
                {
                  name: 'isMegaMenu',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Opens the Tours mega-menu',
                },
              ],
            },
            {
              name: 'headerFeatured',
              type: 'array',
              labels: { singular: 'Promo card', plural: 'Promo cards' },
              maxRows: 2,
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  name: 'eyebrow',
                  type: 'text',
                  admin: { description: 'Small orange label in brackets, e.g. "Our Speciality".' },
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. /destinations/rwanda' },
                },
                { name: 'blurb', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Footer navigation',
          description:
            'Link columns in the footer. Add a column, then add links to it. Empty columns are hidden.',
          fields: [
            {
              name: 'footerGroups',
              type: 'array',
              labels: { singular: 'Column', plural: 'Columns' },
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  name: 'links',
                  type: 'array',
                  labels: { singular: 'Link', plural: 'Links' },
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    {
                      name: 'href',
                      type: 'text',
                      required: true,
                      admin: { description: 'e.g. /destinations/rwanda or https://example.com' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Journal page',
          description: 'Headings and copy on the Journal index page.',
          fields: [
            { name: 'journalEyebrow', type: 'text' },
            {
              name: 'journalHeadingLight',
              type: 'text',
              admin: { description: 'First line of the hero heading (light weight).' },
            },
            {
              name: 'journalHeadingBold',
              type: 'text',
              admin: { description: 'Second line of the hero heading (bold, orange).' },
            },
            { name: 'journalIntro', type: 'textarea' },
            {
              name: 'journalContributors',
              type: 'text',
              admin: { description: 'Value for the "Field contributors" stat.' },
            },
            {
              name: 'journalCadence',
              type: 'text',
              admin: { description: 'Value for the "Cadence" stat, e.g. Monthly.' },
            },
            {
              type: 'collapsible',
              label: 'Newsletter block',
              fields: [
                { name: 'journalCtaEyebrow', type: 'text' },
                { name: 'journalCtaHeadingLight', type: 'text' },
                { name: 'journalCtaHeadingBold', type: 'text' },
                { name: 'journalCtaBody', type: 'textarea' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
