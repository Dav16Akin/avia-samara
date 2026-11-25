import type { Metadata } from "next";
import ShopChrome from "@/components/ShopChrome";
import ProductTile from "@/components/ProductTile";
import { FittingForm } from "@/components/WhatsAppForms";
import { productsIn, collectionOf } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Bespoke Suits in Lagos & Benin City: Book a Fitting",
  description:
    "Book a Samara Bespoke fitting in Lekki, Lagos or GRA, Benin City: custom-made two-piece and three-piece suits, tailored jackets and formalwear cut to your measurements.",
  alternates: { canonical: "/bespoke/" },
  openGraph: { url: "/bespoke/", title: "Samara Bespoke: book a fitting", images: ["/share.jpg"] },
};

export default function Bespoke() {
  const c = collectionOf("bespoke");
  return (
    <ShopChrome current="bespoke">
      <header className="pg__head">
        <span className="pg__no">Collection {c.no}</span>
        <h1>Book a Samara Bespoke fitting</h1>
        <p>{c.line} Tell us what you need and when, send it on WhatsApp, and we reply to arrange the fitting.</p>
      </header>
      <div className="grid bag">
        <FittingForm />
      </div>
      <section className="pdp__more" aria-labelledby="bs-h">
        <h2 id="bs-h">Suits from Samara Bespoke</h2>
        <div className="grid">
          {productsIn("bespoke").map((p) => (
            <ProductTile p={p} key={p.slug} />
          ))}
        </div>
      </section>
    </ShopChrome>
  );
}
