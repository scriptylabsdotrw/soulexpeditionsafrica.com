# Drop your images here 📥

This is your **drop folder**. Put any static images you want on the website here,
then tell me where each one should be used (e.g. "use `gorilla.jpg` as the homepage hero").

## How it works

Anything in this folder is served from the site at `/images/uploads/<filename>`:

```
public/images/uploads/gorilla.jpg   →   /images/uploads/gorilla.jpg
```

## Steps

1. Copy your image files into this folder (`public/images/uploads/`).
2. Tell me the filename and where it should appear — for example:
   - "Use `lake-kivu.jpg` on the Visit Rwanda hero"
   - "Replace the Tours mega-menu Rwanda image with `rwanda-card.jpg`"
3. I'll wire it into the right component/page and, if needed, move it into the
   proper folder (`hero/`, `destinations/`, `tours/`, etc.).

## Tips

- **Format:** WebP or AVIF preferred (smaller, sharper). JPG is fine. Avoid PNG for photos.
- **Quality:** export at 80–85%. Bigger than that is wasted bytes.
- **Naming:** lowercase, dashes instead of spaces (`lake-kivu.jpg`, not `Lake Kivu.JPG`).
- **Size:** heroes ≥ 2400px wide; cards ≥ 1600px. Next.js resizes responsively.
