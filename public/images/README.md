# Image assets

Photography for the site. Anything in here is served from the site root.

```
/public/images/hero/gorilla.jpg   →   /images/hero/gorilla.jpg
```

## Folders

- **`hero/`** — Full-bleed hero images. Used on the homepage and destination/tour hero sections. Minimum 2400×1600 @ JPG/AVIF.
- **`destinations/`** — Country card images (homepage spotlight, destinations grid, destination detail hero). Minimum 1600×2000 (portrait) and 2400×1600 (landscape hero).
- **`expeditions/`** — Signature expedition images. Minimum 1600×2000.
- **`tours/`** — Per-tour images. Minimum 1600×1280 (landscape).

## After dropping files

Tell me which image replaces which Unsplash placeholder in `app/destinations/data.ts` and I'll swap the URLs. Or just rename your file to match the slug (`gorilla-trekking.jpg` for tour `gorilla-trekking`) and I'll wire it up.

## Format guidance

- **AVIF or WebP** preferred — smaller, sharper. Next.js `<Image>` will handle responsive sizing automatically.
- **JPG** fine. Avoid PNG for photos (huge file size).
- **Compression target:** 80–85% quality. Anything above is wasted bytes.
