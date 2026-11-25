import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Pic from "@/components/Pic";
import ProductTile from "@/components/ProductTile";
import JsonLd from "@/components/JsonLd";
import Lookbook from "@/components/Lookbook";
import FilmBand from "@/components/FilmBand";
import { HeroFilm, FilmButton, FilmDialog } from "@/components/HeroFilm";
import { collections, products, type Photo } from "@/lib/catalog";
import { storesLd } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/* type: product (site-kind other)
   deal: hero split with the client's film (was product), nav nav-mega, close close-type, footer footer-dark,
         rhythm dark-band, buttons pill (the client's design.md), mark: the client's AS monogram, grounds none
   palette: the client's design.md, monochrome #111111 on #ffffff with no accent, through start.mjs brand;
            type: the brand's own, Cinzel (logo tagline, monogram) and Montserrat (wordmark, shop sign)
   moments: picture-develops on the store band's photograph; pinned-chapters in the bespoke section
   plan: hero 1 (the store film full bleed under a clear header) · collections (an editorial wall, names over the photographs) ·
         lookbook (pinned: the scroll walks a rail of all the looks) · film (the TV cut opening to full bleed) ·
         pieces (four category cards) · new (four product cards, no prices on the home page) ·
         store 1 (dark band: the Lagos store, stills from the film) · bespoke 2 (use: the fitting) · footer (one band, the same on every page)
   client media: every Pic and the films come from media-src/ through `npm run images` and
   scripts/encode-video.swift; the pieces are the client's lookbook (lib/catalog.ts). Hovering any card
   shows a second view of the same piece. */

// the bespoke steps' pinned frame is half the page wide on a desktop (up to about 640 px, 1280 at 2x)
const BESPOKE_SIZES = "(max-width: 1023px) 100vw, 50vw";

/* The collections as an editorial wall: each a tall photograph with its name set over it, centred,
   on a shade that keeps the white words readable on any frame; a second piece from the collection
   fades in under the pointer. No price on the home page. */
function CollectionWall() {
  return (
    <div className="wall">
      {collections.map((c, i) => (
        <a className="wall__tile has-alt" href={`/collections/${c.slug}/`} key={c.slug} data-reveal="" style={{ ["--i" as string]: i % 3 }}>
          <Pic
            name={c.media.name}
            alt={c.media.alt}
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 420px"
            priority={i < 3}
            style={{ objectPosition: c.media.focus }}
            data-subject="product"
          />
          <Pic className="wall__alt" name={c.hover.name} alt="" sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 420px" style={{ objectPosition: c.hover.focus }} />
          <span className="wall__label">
            <span className="wall__no">{c.group}</span>
            <span className="wall__name">{c.name}</span>
            <span className="wall__short">{c.short}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

/* Shop by piece: four doors into the shop, a photograph (a second on hover) and one word under it */
const pieces: { label: string; href: string; a: Photo; b: Photo }[] = [
  {
    label: "Agbadas",
    href: "/collections/royalty/",
    a: { name: "look-black-brocade-trim-agbada-2", alt: "A man in a black agbada with the sleeves held open to show the brocade lining", focus: "50% 30%" },
    b: { name: "look-royal-blue-agbada-2", alt: "", focus: "50% 30%" },
  },
  {
    label: "Caftans",
    href: "/collections/signature/",
    a: { name: "look-black-brocade-panel-caftan-2", alt: "A man in a long black caftan with a brocade panel falling to the hem", focus: "50% 30%" },
    b: { name: "look-cream-jacquard-set-1", alt: "", focus: "50% 30%" },
  },
  {
    label: "Streetwear",
    href: "/collections/urban/",
    a: { name: "look-embroidered-denim-set-3", alt: "A man in an embroidered denim set, one knee raised", focus: "50% 30%" },
    b: { name: "look-burgundy-print-set-1", alt: "", focus: "50% 30%" },
  },
  {
    label: "Statement pieces",
    href: "/collections/avant-garde/",
    a: { name: "look-green-web-stitch-set-3", alt: "The back of a green shirt-jacket stitched with a full spider web", focus: "50% 30%" },
    b: { name: "look-navy-monogram-set-2", alt: "", focus: "50% 35%" },
  },
];

const arrivals = products.filter((p) => p.isNew).slice(0, 4);
// the lookbook shows eight looks, one of each kind, so the rail is a short walk
const LOOKBOOK = ["royal-blue-agbada", "navy-monogram-set", "floral-grand-agbada", "embroidered-denim-set", "red-fringe-tunic-set", "cream-wrap-jacket-set", "gold-brocade-wrapper-set", "green-web-stitch-set"];
const looks = LOOKBOOK.map((slug) => products.find((p) => p.slug === slug)!).map((p) => ({ slug: p.slug, name: p.name, photos: p.photos.slice(0, 2) }));

export default function Home() {
  return (
    <>
      <SiteNav overlay />
      <JsonLd data={storesLd()} />
      <main id="top">
        <section className="hero hero--stage ground-inverse" data-enter="" aria-labelledby="hero-h">
          {/* CLIENT FILE film: media-src/video/brand-film.mp4 (720x1280, the 1:56 store film), cut and
              encoded to public/media/video by scripts/encode-triptych.swift and encode-video.swift */}
          {/* the posters are the film's CSS background: fetch the right one at once (React puts these in <head>) */}
          <link rel="preload" as="image" href="/media/video/hero-wide-poster.webp" media="(min-aspect-ratio: 1/1)" fetchPriority="high" />
          <link rel="preload" as="image" href="/media/video/hero-poster.webp" media="(max-aspect-ratio: 1/1)" fetchPriority="high" />
          <HeroFilm />
          <div className="wrap">
            <div className="hero-text stage__copy">
              <p className="hero__kicker">Men&rsquo;s boutique &amp; luxury store, Lagos &amp; Benin City</p>
              <h1 id="hero-h">Be born of change and wear in style</h1>
              <p className="t-lead">
                Agbadas, caftans, suits and streetwear designed by Avia Samara, every piece fitted to you at the Lagos store.
              </p>
              <div className="stage__actions">
                <div className="btn-row">
                  <a className="btn btn--primary" href="/bespoke/">Book a fitting</a>
                </div>
                <FilmButton />
              </div>
            </div>
          </div>
        </section>

        <section className="section gallery" id="collections" aria-labelledby="collections-h">
          <div className="wrap">
            <p className="eyebrow eyebrow--center">Six collections, one house</p>
            <h2 className="gallery__title" id="collections-h">Choose a collection</h2>
            <CollectionWall />
          </div>
        </section>

        <Lookbook looks={looks} />

        <FilmBand />

        <section className="section gallery" id="pieces" aria-labelledby="pieces-h">
          <div className="wrap">
            <h2 className="gallery__title" id="pieces-h">Shop by piece</h2>
            <div className="cards">
              {pieces.map((x, i) => (
                <a className="card-cat" href={x.href} key={x.label} data-reveal="" style={{ ["--i" as string]: i }}>
                  <span className="card-cat__media has-alt">
                    <Pic name={x.a.name} alt={x.a.alt} sizes="(max-width: 639px) 50vw, 310px" style={{ objectPosition: x.a.focus }} data-subject="product" />
                    <Pic className="card-cat__alt" name={x.b.name} alt="" sizes="(max-width: 639px) 50vw, 310px" style={{ objectPosition: x.b.focus }} />
                  </span>
                  <span className="card-cat__label">{x.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section gallery" id="new" aria-labelledby="new-h">
          <div className="wrap">
            <h2 className="gallery__title" id="new-h">New in the shop</h2>
            <div className="grid cards--products">
              {arrivals.map((p) => (
                <ProductTile p={p} key={p.slug} />
              ))}
            </div>
            <p className="gallery__more"><a className="link" href="/shop/">See all pieces</a></p>
          </div>
        </section>

        <section className="section ground-inverse" id="store" aria-labelledby="store-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="store-h">The Avia Samara store in Lagos</h2>
              <p>Every collection on the rails, with shoes and accessories, and a fitting for every piece you order.</p>
              <a className="link" href="/bespoke/">Book a fitting at the store</a>
            </div>
            <div className="trio fill">
              <figure className="trio__a" data-moment="picture-develops">
                <Pic name="film-store" sizes="(max-width: 639px) 100vw, 628px" alt="The Avia Samara store: lit wood walls, glass counters of folded shirts, rails of jackets and the AVIA-SAMARA sign" style={{ objectPosition: "50% 55%" }} data-subject="place" />
              </figure>
              <figure className="trio__b">
                <Pic name="film-hooded" sizes="(max-width: 639px) 50vw, 302px" alt="A seated mannequin in a dark hooded robe with stitched edges, on the store's AS rug" style={{ objectPosition: "50% 40%" }} data-subject="product" />
              </figure>
              <figure className="trio__c">
                <Pic name="film-jacket" sizes="(max-width: 639px) 50vw, 302px" alt="A black jacket with white floral embroidery on an Avia Samara hanger" style={{ objectPosition: "50% 40%" }} data-subject="detail" />
              </figure>
            </div>
          </div>
        </section>

        <section className="section" id="bespoke" style={{ ["--h" as string]: 2 }} data-moment="pinned-chapters" aria-labelledby="bespoke-h">
          <div className="wrap mo-pc__grid">
            <div className="mo-pc__text">
              <h2 id="bespoke-h">How a Samara Bespoke suit is made</h2>
              <ol className="mo-pc__steps">
                <li className="mo-pc__step">
                  <h3>1. Book a fitting</h3>
                  <p>Tell us the occasion and the date you need the suit for. We take your measurements at the fitting.</p>
                  <figure className="mo-pc__visual">
                    <Pic name="look-cream-wrap-jacket-set-2" sizes={BESPOKE_SIZES} alt="A man in a cream wrap jacket and brown hat, the jacket's collar and pin in view" style={{ objectPosition: "50% 25%" }} data-subject="use" />
                  </figure>
                </li>
                <li className="mo-pc__step">
                  <h3>2. Choose the cloth and the cut</h3>
                  <p>Pick a cloth from the swatch books, then the cut: two-piece, three-piece or a tailored jacket alone.</p>
                  <figure className="mo-pc__visual">
                    <Pic name="look-navy-monogram-set-2" sizes={BESPOKE_SIZES} alt="The back of a navy jacket with the AS monogram embroidered in red beads" style={{ objectPosition: "50% 35%" }} data-subject="parts" />
                  </figure>
                </li>
                <li className="mo-pc__step">
                  <h3>3. Collect the finished suit</h3>
                  <p>The suit is cut and sewn to your measurements, then checked on you before it leaves.</p>
                  <figure className="mo-pc__visual">
                    <Pic name="look-pink-quilted-jacket-set-1" sizes={BESPOKE_SIZES} alt="A finished look: a pale pink quilted jacket over a burgundy top and flared trousers" style={{ objectPosition: "50% 30%" }} data-subject="use" />
                  </figure>
                </li>
              </ol>
            </div>
            <div className="mo-pc__visuals frame"></div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FilmDialog />
    </>
  );
}
