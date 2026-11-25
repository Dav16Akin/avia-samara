import type { Metadata } from "next";
import ShopChrome, { CollectionFilters } from "@/components/ShopChrome";
import ProductTile from "@/components/ProductTile";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop Men's Agbadas, Caftans, Suits & Streetwear",
  description:
    "Shop every Avia Samara piece: agbadas, caftans, bespoke suits and streetwear for men, fitted to you at our Lagos and Benin City stores. Order on WhatsApp.",
  alternates: { canonical: "/shop/" },
  openGraph: { url: "/shop/", title: "Shop Avia Samara menswear", images: ["/share.jpg"] },
};

// Every piece in one grid: the pieces' collections are ours until the client confirms them, so the shop
// does not sort by them; the filters above still lead to each collection's page.
export default function Shop() {
  return (
    <ShopChrome current="shop">
      <header className="pg__head">
        <h1>All pieces</h1>
        <p>{products.length} pieces from the new Avia Samara shoot, each fitted to you.</p>
      </header>
      <CollectionFilters />
      <div className="grid">
        {products.map((p, i) => (
          <ProductTile p={p} key={p.slug} eager={i < 4} />
        ))}
      </div>
    </ShopChrome>
  );
}
