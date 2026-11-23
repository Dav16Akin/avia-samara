import type { Metadata } from "next";
import ShopChrome, { CollectionFilters } from "@/components/ShopChrome";
import ProductTile from "@/components/ProductTile";
import { collections, productsIn, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop all pieces: Avia Samara",
  description: "Every Avia Samara piece in one list: agbadas, caftans, suits and streetwear across the Samara collections.",
};

export default function Shop() {
  return (
    <ShopChrome current="shop">
      <header className="pg__head">
        <h1>All pieces</h1>
        <p>{products.length} pieces from the Samara collections, each fitted to you.</p>
      </header>
      <CollectionFilters />
      {collections.map((c, i) => (
        <section className="pg__group" key={c.slug} aria-labelledby={`g-${c.slug}`}>
          <h2 id={`g-${c.slug}`}>{c.name}</h2>
          <div className="grid">
            {productsIn(c.slug).map((p) => (
              <ProductTile p={p} key={p.slug} eager={i === 0} />
            ))}
          </div>
        </section>
      ))}
    </ShopChrome>
  );
}
