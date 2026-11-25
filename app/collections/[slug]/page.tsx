import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopChrome, { CollectionFilters } from "@/components/ShopChrome";
import ProductTile from "@/components/ProductTile";
import JsonLd from "@/components/JsonLd";
import { collections, productsIn, photoUrl } from "@/lib/catalog";
import { abs, breadcrumbLd } from "@/lib/site";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) return {};
  const path = `/collections/${c.slug}/`;
  const title = `${c.name}: ${c.short}`;
  const description = `${c.line} Shop ${c.name} by Avia Samara, fitted to you at our stores in Lekki, Lagos and GRA, Benin City.`;
  const image = photoUrl(c.media.name);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: `${c.name} | Avia Samara`, description, images: [image] },
    twitter: { card: "summary_large_image", title: `${c.name} | Avia Samara`, description, images: [image] },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) notFound();
  const list = productsIn(c.slug);
  return (
    <ShopChrome current={c.slug === "ceremonial" ? "ceremonial" : undefined}>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Shop", path: "/shop/" }, { name: c.name, path: `/collections/${c.slug}/` }]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: c.name,
            description: c.line,
            url: abs(`/collections/${c.slug}/`),
            isPartOf: { "@id": abs("/#website") },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: list.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/products/${p.slug}/`), name: p.name })),
            },
          },
        ]}
      />
      <header className="pg__head">
        <span className="pg__no">Collection {c.no}</span>
        <h1>{c.name}</h1>
        <p>{c.line}</p>
        {c.madeToOrder && (
          <p>
            Every Bespoke piece is made to your measurements. <a className="link" href="/bespoke/">Book a fitting</a>
          </p>
        )}
      </header>
      <CollectionFilters active={c.slug} />
      <div className="grid">
        {list.map((p) => (
          <ProductTile p={p} key={p.slug} eager />
        ))}
      </div>
    </ShopChrome>
  );
}
