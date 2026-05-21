# Logo assets

Files in this folder are served from the site root.

```
/public/logos/soul-expeditions.svg   →   https://soulexpeditionsafrica.com/logos/soul-expeditions.svg
```

## What to put here

### Brand (this folder root)

| Filename | Where it's used | Notes |
|---|---|---|
| `soul-expeditions.svg` | Header lockup, footer | Full wordmark + mark, dark-on-light variant |
| `soul-expeditions-mark.svg` | Header (mobile), favicon source | Just the "S" mark, square |
| `soul-expeditions-white.svg` | Footer, dark-section overlays | Inverted wordmark, white-on-dark variant |
| `favicon.svg` | Browser tab | 32×32 source — Next handles other sizes |

**SVG preferred** for the logo so it scales crisp at any size. PNG fallback OK at 2× retina (e.g. 240×60).

### Subfolders

- **`partners/`** — Lodge & camp partners (Singita, Wilderness, andBeyond, etc.). Used in the home page partners marquee and the "as featured in" strip.
- **`press/`** — Publications (Condé Nast, Travel + Leisure, Robb Report, etc.). Used in the home page press strip.

## After dropping files

Tell me which file maps to which section and I'll swap the current text placeholders for `<Image>` components with the right dimensions and `alt` text.
