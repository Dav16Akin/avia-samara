import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalog";
import { abs } from "@/lib/site";

// Written to out/sitemap.xml at build time (static export). The bag and checkout are left out: they
// hold nothing a search should land on.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) => ({
    url: abs(path),
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/shop/", 0.9, "weekly"),
    ...collections.map((c) => page(`/collections/${c.slug}/`, 0.8, "weekly")),
    page("/bespoke/", 0.8, "monthly"),
    ...products.map((p) => page(`/products/${p.slug}/`, 0.7, "monthly")),
    page("/terms/", 0.2, "yearly"),
    page("/privacy/", 0.2, "yearly"),
  ];
}
