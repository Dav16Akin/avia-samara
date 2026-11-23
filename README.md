# Avia Samara

Online shop for Avia Samara, African menswear in six collections (Royalty, Urban, Bespoke, Signature, Ceremonial, Avant-Garde).

Next.js 16 (static export), React 19, Tailwind v4 (utilities prefixed `tw:`), `motion`, Phosphor icons, and the tasteskill kit in `public/assets`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Where things are

| What | Where |
|---|---|
| Collections, products, prices, photo ids | `lib/catalog.ts` |
| Shopping bag (kept in the browser) | `lib/bag.ts` |
| Home page | `app/page.tsx` |
| Shop, collection, product, bag, checkout, fitting pages | `app/*/page.tsx` |
| Nav and footer | `components/SiteNav.tsx`, `components/SiteFooter.tsx` |
| Page CSS (on top of the kit) | `public/site.css` |
| Colour and type tokens (from the client's design.md) | `app/layout.tsx` |
| Photographs | `public/images` |

## Still stand-ins

- **Products, names and prices** in `lib/catalog.ts` are demo data. Replace with the client's real pieces.
- **Photographs** are free-licence Pexels photographs (`/credits/` lists them). Replace with the client's lookbook.
- **Checkout, fitting and newsletter forms** post to `mailto:` addresses on `aviasamara.example`. Set each form's `data-endpoint` (or wire a payment provider such as Paystack) when the backend exists.
- Remove `output: "export"` in `next.config.ts` once the shop needs a server.

## Notes for developers

- Links are plain `<a>` and images plain `<img>` on purpose: every page is a full load so the kit's scripts start fresh. ESLint is configured for this.
- The kit owns classes such as `grid`, `start-7` and `fill`. Tailwind utilities therefore carry the `tw:` prefix (`tw:flex`).
- Home page checks: `node ~/.claude/skills/design-taste-frontend/scripts/gate.mjs --start out/index.html --root out --kind product --category "African menswear: agbadas, caftans, suits and streetwear" --primary "Shop the collections"`, then `gate.mjs out/index.html` after a build. Keep the checker's Chrome profile outside the project (`$TMPDIR`), or the build tries to read it.
