import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopChrome, { CollectionFilters } from "@/components/ShopChrome";
import ProductTile from "@/components/ProductTile";
import { collections, productsIn } from "@/lib/catalog";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  return c ? { title: `${c.name}: Avia Samara`, description: c.line } : {};
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) notFound();
  const list = productsIn(c.slug);
  return (
    <ShopChrome current={c.slug === "ceremonial" ? "ceremonial" : undefined}>
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
