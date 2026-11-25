import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { collections } from "@/lib/catalog";
import { Lockup } from "@/components/Brand";
import { phone, stores, whatsappUrl } from "@/lib/contact";

export const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

/* The footer, the same on every page: a slim blue strip with the way to ask (WhatsApp, the phone),
   then one quiet dark band in the gallery manner: the logo and a line, the collections, the shop,
   the two stores; a single legal line closes it. */
export default function SiteFooter() {
  return (
    <footer className="foot" id="contact">
      <div className="foot__ask">
        <div className="wrap foot__ask-row">
          <p>Questions about a piece or a fitting? We answer on WhatsApp.</p>
          <div className="foot__ask-links">
            <a className="foot__wa" href={whatsappUrl("Hello Avia Samara")} target="_blank" rel="noopener noreferrer">
              <WhatsappLogoIcon size={18} aria-hidden="true" />
              Message us
            </a>
            <a href={`tel:${phone.tel}`}>{phone.display}</a>
          </div>
        </div>
      </div>

      <div className="wrap foot__main">
        <div className="foot__brand">
          <a className="foot__logo lockup" href="/" aria-label="Avia Samara, home"><Lockup /></a>
          <p>Men&rsquo;s boutique &amp; luxury store. Agbadas, caftans, suits and streetwear, every piece fitted to you.</p>
        </div>
        <nav className="foot__col" aria-label="Collections">
          <h3>Collections</h3>
          <ul>
            {collections.map((c) => (
              <li key={c.slug}><a href={`/collections/${c.slug}/`}>{c.name}</a></li>
            ))}
          </ul>
        </nav>
        <nav className="foot__col" aria-label="Shop">
          <h3>Shop</h3>
          <ul>
            <li><a href="/shop/">All pieces</a></li>
            <li><a href="/bespoke/">Book a fitting</a></li>
            <li><a href="/bag/">Your bag</a></li>
            <li><a href="/checkout/">Checkout</a></li>
          </ul>
        </nav>
        <div className="foot__col">
          <h3>Visit us</h3>
          {stores.map((s) => (
            <address key={s.city}>
              <strong>{s.city}</strong>
              {s.lines.map((l) => <span key={l}>{l}</span>)}
            </address>
          ))}
        </div>
      </div>

      <div className="wrap foot__legal">
        <span>&copy; 2026 Avia Samara</span>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <span className="foot__credit">Photographs and film: Avia Samara</span>
      </div>
    </footer>
  );
}
