import { collections, img } from "@/lib/catalog";
import { Lockup } from "@/components/Brand";

const Chev = () => (
  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function SiteNav({ current }: { current?: "shop" | "bespoke" | "ceremonial" }) {
  const groups = ["Traditional", "Modern"] as const;
  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">Skip to content</a>
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
                <a className="menu-card span-3 start-10" href="/collections/signature/">
                  <div className="panel">
                    <img className="frame__img" src={img(33356780)} alt="A man in a white caftan set and black cap against a red wall" width={640} height={960} loading="lazy" style={{ objectPosition: "50% 30%" }} data-source="stand-in" data-subject="product" />
                  </div>
                  <span className="t-card">Samara Signature</span>
                  <span className="t-small muted">Caftans with built-in waistcoats</span>
                </a>
              </div>
            </div>
          </div>
          <div className="nav__item"><a className="nav__link" href="/shop/" aria-current={current === "shop" ? "page" : undefined}>Shop</a></div>
          <div className="nav__item"><a className="nav__link" href="/collections/ceremonial/" aria-current={current === "ceremonial" ? "page" : undefined}>Ceremonial</a></div>
          <div className="nav__item"><a className="nav__link" href="/bespoke/" aria-current={current === "bespoke" ? "page" : undefined}>Fittings</a></div>
        </nav>
        <div className="nav__actions">
          <a className="nav__link" href="/bag/">Bag (<span data-bag-count>0</span>)</a>
          <a className="btn btn--primary" href="/shop/">Shop the collection</a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </div>
    </header>
  );
}
