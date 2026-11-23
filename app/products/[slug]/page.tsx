import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopChrome from "@/components/ShopChrome";
import ProductTile from "@/components/ProductTile";
import AddToBag from "@/components/AddToBag";
import { products, productsIn, collectionOf, img, naira } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p ? { title: `${p.name}: ${collectionOf(p.collection).name}`, description: p.detail } : {};
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const c = collectionOf(p.collection);
  const more = productsIn(c.slug).filter((x) => x.slug !== p.slug);

  return (
    <ShopChrome>
      <a className="link back" href={`/collections/${c.slug}/`}>{c.name}</a>
      <div className="grid pdp">
        <div className="pdp__media span-7">
          <img src={img(p.photo, 1280)} alt={p.alt} width={1280} height={1600} fetchPriority="high" style={{ objectPosition: p.focus }} data-source="stand-in" data-subject="product" />
        </div>
        <div className="pdp__info span-4 start-9">
          <h1>{p.name}</h1>
          <p className="pdp__price" data-assumed>{naira(p.price)}</p>
          <p>{p.detail}</p>
          {c.madeToOrder ? (
            <div className="pdp__buy">
              <p>Made to your measurements. The price is a starting price for the cloth shown.</p>
              <a className="btn btn--primary" href="/bespoke/">Book a fitting</a>
            </div>
          ) : (
            <AddToBag slug={p.slug} />
          )}
          <ul className="rows rows--spec">
            <li><span className="rows__name">Collection</span><span className="rows__value">{c.name}</span></li>
            <li><span className="rows__name">Fit</span><span className="rows__value">Made to your measurements</span></li>
            <li><span className="rows__name">Delivery</span><span className="rows__value">Priced at checkout</span></li>
          </ul>
        </div>
      </div>
      <section className="pdp__more" aria-labelledby="more-h">
        <h2 id="more-h">More from {c.name}</h2>
        <div className="grid">
          {more.map((x) => (
            <ProductTile p={x} key={x.slug} span="span-4" />
          ))}
        </div>
      </section>
    </ShopChrome>
  );
}
