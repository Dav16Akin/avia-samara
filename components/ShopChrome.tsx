import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { collections } from "@/lib/catalog";

// The frame every shop page shares: the nav, the page column, the footer links.
export default function ShopChrome({ children, current }: { children: ReactNode; current?: "shop" | "bespoke" | "ceremonial" }) {
  return (
    <>
      <SiteNav current={current} />
      <main id="top" className="pg">
        <div className="wrap">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}

export function CollectionFilters({ active }: { active?: string }) {
  return (
    <nav className="pg__filters" aria-label="Collections">
      <a className="pill" href="/shop/" aria-current={active ? undefined : "page"}>All pieces</a>
      {collections.map((c) => (
        <a className="pill" href={`/collections/${c.slug}/`} key={c.slug} aria-current={active === c.slug ? "page" : undefined}>
          {c.name.replace("Samara ", "")}
        </a>
      ))}
    </nav>
  );
}
