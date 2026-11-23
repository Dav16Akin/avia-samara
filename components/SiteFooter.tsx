import type { ReactNode } from "react";
import { collections } from "@/lib/catalog";
import { FullLogo } from "@/components/Brand";

export const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

// footer.closing: row 1 the close (close-type on the home page), row 2 the links.
// Inner pages pass no close and get the links alone.
export default function SiteFooter({ close, phoneTwo }: { close?: ReactNode; phoneTwo?: boolean }) {
  const groups = ["Traditional", "Modern"] as const;
  return (
    <footer className={`footer ${close ? "closing" : "footer--plain"}${phoneTwo ? " g2m" : ""} footer--dark ground-inverse`} id="contact" aria-labelledby={close ? "close-h" : undefined}>
      <div className="wrap">
        {close}
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <a className="footer__mark" href="/" aria-label="Avia Samara, home"><FullLogo /></a>
              <p className="footer__lede">Menswear designed and fitted in Lagos.</p>
            </div>
            {groups.map((g) => (
              <div className="span-2 footer__col" key={g}>
                <h3>{g}</h3>
                <ul>
                  {collections.filter((c) => c.group === g).map((c) => (
                    <li key={c.slug}><a href={`/collections/${c.slug}/`}>{c.name}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="span-2 footer__col">
              <h3>Shop</h3>
              <ul>
                <li><a href="/shop/">All pieces</a></li>
                <li><a href="/bag/">Your bag</a></li>
                <li><a href="/bespoke/">Fittings</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Newsletter</h3>
              <form className="news" action="mailto:hello@aviasamara.example" method="post" encType="text/plain">
                <label htmlFor="news-email">Email</label>
                <input id="news-email" name="email" type="email" autoComplete="email" inputMode="email" required />
                <button className="link" type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="footer__legal">
            <span><span>&copy; 2026 Avia Samara</span><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></span>
            <div className="socials"></div>
            <a className="credits" href="/credits/">Photographs via Pexels</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
