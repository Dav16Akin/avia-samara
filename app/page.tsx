import SiteNav from "@/components/SiteNav";
import SiteFooter, { Arrow } from "@/components/SiteFooter";
import Pic from "@/components/Pic";
import { HeroFilm, FilmButton, FilmDialog } from "@/components/HeroFilm";
import { collections, products, collectionOf, fromPrice, img, naira } from "@/lib/catalog";

/* type: product (site-kind other)
   deal: hero split with the client's film (was product), nav nav-mega, close close-type, footer footer-dark,
         rhythm dark-band, buttons pill (the client's design.md), mark: the client's AS monogram, grounds none
   palette: the client's design.md, monochrome #111111 on #ffffff with no accent, through start.mjs brand;
            type: the brand's own, Cinzel (logo tagline, monogram) and Montserrat (wordmark, shop sign)
   moments: picture-develops on the store band's photograph; pinned-chapters in the bespoke section
   plan: hero 1 (the store film full bleed: a three-column cut on wide screens, the portrait cut on phones) · collections 2 (the client's photographs) · new 1 (peek-list) ·
         store 1 (dark band: the Lagos store, stills from the film) · bespoke 2 (use: the fitting) · footer.closing 1
   client media: every Pic and the film come from media-src/ through `npm run images` and
   scripts/encode-video.swift; the products in "New in the shop" are still stand-ins (lib/catalog.ts). */

const tileRows = [collections.slice(0, 3), collections.slice(3)];
const arrivals = products.filter((p) => p.isNew);

function CollectionTiles({ row }: { row: typeof collections }) {
  return (
    <div className="grid">
      {row.map((c, i) => (
        <a className="tile span-4" href={`/collections/${c.slug}/`} key={c.slug}>
          <div className="tile__media">
            {c.media ? (
              <Pic
                name={c.media.name}
                alt={c.media.alt}
                sizes={i === 2 ? "(max-width: 639px) 100vw, 410px" : "(max-width: 639px) 50vw, 410px"}
                style={{ objectPosition: c.media.focus }}
                data-subject="product"
              />
            ) : (
              <img
                src={img(c.photo)}
                srcSet={`${img(c.photo, 320)} 320w, ${img(c.photo)} 640w, ${img(c.photo, 1280)} 1280w`}
                sizes={i === 2 ? "(max-width: 639px) 100vw, 410px" : "(max-width: 639px) 50vw, 410px"}
                alt={products.find((p) => p.photo === c.photo)?.alt ?? c.name}
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: c.focus }}
                data-source="stand-in"
                data-subject="product"
              />
            )}
          </div>
          <div className="tile__head">
            <h3>{c.name}</h3>
            <span className="tile__price" data-assumed>from {naira(fromPrice(c.slug))}</span>
          </div>
          <p className="tile__facts">{c.short}</p>
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteNav />
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
              <p className="hero__kicker">Men&rsquo;s boutique &amp; luxury store, Lagos</p>
              <h1 id="hero-h">Be born of change and wear in style</h1>
              <p className="t-lead">
                Agbadas, caftans, suits and streetwear designed by Avia Samara, every piece fitted to you at the Lagos store.
              </p>
              <div className="stage__actions">
                <div className="btn-row">
                  <a className="btn btn--primary" href="/shop/">Shop the collection<Arrow /></a>
                  <a className="btn btn--secondary" href="/bespoke/">Book a fitting</a>
                </div>
                <FilmButton />
              </div>
            </div>
          </div>
        </section>

        <section className="section g2 g2m" id="collections" aria-labelledby="collections-h">
          <div className="wrap">
            <div className="group">
              <div className="section-head">
                <h2 id="collections-h">The Samara collections</h2>
              </div>
              <CollectionTiles row={tileRows[0]} />
            </div>
            <CollectionTiles row={tileRows[1]} />
          </div>
        </section>

        <section className="section" id="new" aria-labelledby="new-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="new-h">New in the shop</h2>
            </div>
            <div className="grid grid--top fill" data-peek="">
              <ul className="rows span-6">
                {arrivals.map((p) => (
                  <li data-peek-to={p.slug} tabIndex={0} key={p.slug}>
                    <a className="rows__name" href={`/products/${p.slug}/`}>{p.name}</a>
                    <p>{collectionOf(p.collection).name}</p>
                    <span className="rows__value" data-assumed>{naira(p.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="frame frame--photo frame--fill span-6 start-7">
                {arrivals.map((p, i) => (
                  <img
                    className="frame__img"
                    data-peek-for={p.slug}
                    src={img(p.photo, 1280)}
                    srcSet={`${img(p.photo)} 640w, ${img(p.photo, 1280)} 1280w`}
                    sizes="(max-width: 1023px) 100vw, 628px"
                    alt={p.alt}
                    width={1280}
                    height={1600}
                    loading="lazy"
                    style={{ objectPosition: p.focus }}
                    hidden={i > 0}
                    data-source="stand-in"
                    data-subject={i === 0 ? "product" : "people"}
                    key={p.slug}
                  />
                ))}
              </div>
            </div>
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
                    <Pic name="film-founder" sizes="(max-width: 639px) 100vw, 628px" alt="Samuel Sentinawa, founder of Avia Samara, at his desk beside a tailored waistcoat on a stand" style={{ objectPosition: "50% 45%" }} data-subject="use" />
                  </figure>
                </li>
                <li className="mo-pc__step">
                  <h3>2. Choose the cloth and the cut</h3>
                  <p>Pick a cloth from the swatch books, then the cut: two-piece, three-piece or a tailored jacket alone.</p>
                  <figure className="mo-pc__visual">
                    <Pic name="film-bowtie" sizes="(max-width: 639px) 100vw, 628px" alt="A patterned bow tie and a shawl lapel in dark glitter cloth on a tailor's stand" style={{ objectPosition: "50% 45%" }} data-subject="parts" />
                  </figure>
                </li>
                <li className="mo-pc__step">
                  <h3>3. Collect the finished suit</h3>
                  <p>The suit is cut and sewn to your measurements, then checked on you before it leaves.</p>
                  <figure className="mo-pc__visual">
                    <Pic name="film-hanger" sizes="(max-width: 639px) 100vw, 628px" alt="A finished grey jacket on a white Avia Samara hanger with a copper hook" style={{ objectPosition: "50% 40%" }} data-subject="use" />
                  </figure>
                </li>
              </ol>
            </div>
            <div className="mo-pc__visuals frame"></div>
          </div>
        </section>
      </main>

      <SiteFooter
        phoneTwo
        close={
          <div className="closing__cta close--type">
            <div className="section-head">
              <h2 id="close-h">Every piece fitted to you in Lagos</h2>
              <p className="t-small muted">Order online, and we take your measurements at the store.</p>
            </div>
            <a className="btn btn--primary btn--xl" href="/shop/">
              Shop the collection
              <Arrow />
            </a>
          </div>
        }
      />
      <FilmDialog />
      <nav className="actionbar" aria-label="Quick actions">
        <a className="btn btn--primary" href="/shop/">Shop the collection</a>
      </nav>
    </>
  );
}
