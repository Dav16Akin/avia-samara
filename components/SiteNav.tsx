import { HandbagIcon, MagnifyingGlassIcon, UserIcon } from "@phosphor-icons/react/ssr";
import { collections } from "@/lib/catalog";
import { Lockup, VariantLogo } from "@/components/Brand";
import NavScroll from "@/components/NavScroll";

const Chev = () => (
  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* The collections, one line on the brand blue above the bar. A phone shows them as a slow ticker
   (a second, hidden copy closes the loop); under reduced motion the line scrolls by hand. */
function Banner() {
  const links = (copy: boolean) =>
    collections.map((c) => (
      <a href={`/collections/${c.slug}/`} key={c.slug} tabIndex={copy ? -1 : undefined}>
        {c.name.replace("Samara ", "")}
      </a>
    ));
  return (
    <nav className="banner" aria-label="The Samara collections">
      <div className="banner__track">
        <span className="banner__label">The Samara collections</span>
        <div className="banner__set">{links(false)}</div>
        <div className="banner__set banner__set--copy" aria-hidden="true">{links(true)}</div>
      </div>
    </nav>
  );
}

/* The header: the collections banner, then the bar in three parts (the words left, the logo in the
   middle, the icons right). With `overlay` (the home page) the bar is clear over the film, its words
   white, and turns white once the film has scrolled away (NavScroll) or a menu opens. */
export default function SiteNav({ current, overlay = false }: { current?: "shop" | "bespoke" | "ceremonial"; overlay?: boolean }) {
  const groups = ["Traditional", "Modern"] as const;
  return (
    <header className={`nav nav--split${overlay ? " nav--overlay" : ""}`}>
      <a className="skip-link" href="#top">Skip to content</a>
      <Banner />
      <div className="wrap nav__bar">
        <a className="nav__logo lockup" href="/" aria-label="Avia Samara, home"><Lockup /></a>
        <nav className="nav__links" aria-label="Main">
          <div className="nav__item">
            <a className="nav__link" href="/#collections">Collections <Chev /></a>
            <div className="nav__menu">
              <div className="wrap grid">
                {groups.map((g) => (
                  <div className="menu-col span-3" key={g}>
                    <p className="t-label">{g}</p>
                    {collections.filter((c) => c.group === g).map((c) => (
                      <a href={`/collections/${c.slug}/`} key={c.slug}>
                        {c.name}
                        <span>{c.short}</span>
                      </a>
                    ))}
                  </div>
                ))}
                <a className="menu-card menu-card--brand span-3 start-10" href="/shop/">
                  <div className="panel">
                    <VariantLogo id="menu-split" />
                  </div>
                  <span className="t-card">Every piece, every collection</span>
                  <span className="t-small muted">Agbadas, caftans, suits and streetwear</span>
                </a>
              </div>
            </div>
          </div>
          <div className="nav__item"><a className="nav__link" href="/shop/" aria-current={current === "shop" ? "page" : undefined}>Shop</a></div>
          <div className="nav__item"><a className="nav__link" href="/collections/ceremonial/" aria-current={current === "ceremonial" ? "page" : undefined}>Ceremonial</a></div>
          <div className="nav__item"><a className="nav__link" href="/bespoke/" aria-current={current === "bespoke" ? "page" : undefined}>Fittings</a></div>
        </nav>
        <div className="nav__actions">
          <a className="nav__icon nav__icon--search" href="/shop/" aria-label="Search">
            <MagnifyingGlassIcon size={22} aria-hidden="true" />
          </a>
          <button className="nav__icon nav__icon--account" type="button" aria-label="Account">
            <UserIcon size={22} aria-hidden="true" />
          </button>
          <a className="nav__icon nav__icon--bag" href="/bag/" aria-label="Bag">
            <HandbagIcon size={22} aria-hidden="true" />
            <span className="nav__count" data-bag-count hidden>0</span>
          </a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </div>
      {overlay && <NavScroll />}
    </header>
  );
}
