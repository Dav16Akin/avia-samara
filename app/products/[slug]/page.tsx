import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopChrome from "@/components/ShopChrome";
import ProductTile from "@/components/ProductTile";
import AddToBag from "@/components/AddToBag";
import ProductGallery from "@/components/ProductGallery";
import JsonLd from "@/components/JsonLd";
import { products, photoUrl } from "@/lib/catalog";
import { breadcrumbLd } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  const path = `/products/${p.slug}/`;
  const title = p.name;
  const description = `${p.detail} By Avia Samara, fitted to you in Lagos or Benin City.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title, description, images: [{ url: photoUrl(p.photos[0].name), alt: p.photos[0].alt }] },
    twitter: { card: "summary_large_image", title, description, images: [photoUrl(p.photos[0].name)] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  // the pieces' collections are our guesses until the client names them, so the page does not show one:
  // "more" is the next three pieces in the shop's order
  const at = products.indexOf(p);
  const more = [1, 2, 3].map((k) => products[(at + k) % products.length]);
  const path = `/products/${p.slug}/`;

  return (
    <ShopChrome>
      {/* breadcrumbs only: a Product entry needs a price (offers), which waits for the client's prices */}
      <JsonLd data={breadcrumbLd([{ name: "Shop", path: "/shop/" }, { name: p.name, path }])} />
      <a className="link back" href="/shop/">All pieces</a>
      <div className="grid pdp">
        <div className="pdp__media span-7">
          <ProductGallery photos={p.photos} />
        </div>
        <div className="pdp__info span-4 start-9">
          <p className="pdp__kicker">Avia Samara</p>
          <h1>{p.name}</h1>
          <p>{p.detail}</p>
          <AddToBag slug={p.slug} />
          <ul className="rows rows--spec">
            <li><span className="rows__name">Fit</span><span className="rows__value">Made to your measurements</span></li>
            <li><span className="rows__name">Price and delivery</span><span className="rows__value">Confirmed on WhatsApp</span></li>
          </ul>
        </div>
      </div>
      <section className="pdp__more" aria-labelledby="more-h">
        <h2 id="more-h">More pieces</h2>
        <div className="grid">
          {more.map((x) => (
            <ProductTile p={x} key={x.slug} span="span-4" />
          ))}
        </div>
      </section>
    </ShopChrome>
  );
}
