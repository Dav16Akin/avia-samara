import { phone, stores } from "@/lib/contact";

// The site's public address. Set NEXT_PUBLIC_SITE_URL to the real domain (e.g. https://aviasamara.com) in
// Vercel's environment variables; until then the build uses Vercel's own production address, and a local
// build uses localhost. Every canonical link, the sitemap and the share image are built from it.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/+$/, "");

export const abs = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const brand = {
  name: "Avia Samara",
  legalName: "Avia Samara Men's Boutique & Luxury Store",
  slogan: "Be born of change and wear in style",
  description:
    "Men's boutique and luxury store in Lagos and Benin City: agbadas, caftans, custom-made suits and streetwear, every piece fitted to you.",
};

// Each store, as schema.org reads a shop: its street, area, city and state, and the shared phone.
const storeAddresses = [
  { id: "lagos", street: "House 19C, Road 4, Lekki County", locality: "Lekki", region: "Lagos" },
  { id: "benin-city", street: "32b Jemide Street, off Giwa-Amu Road, GRA", locality: "Benin City", region: "Edo" },
] as const;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": abs("/#organization"),
    name: brand.name,
    legalName: brand.legalName,
    slogan: brand.slogan,
    description: brand.description,
    url: abs("/"),
    logo: abs("/apple-touch-icon.png"),
    image: abs("/share.jpg"),
    telephone: phone.tel,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone.tel,
      contactType: "customer service",
      areaServed: "NG",
      availableLanguage: ["English"],
    },
    department: storeAddresses.map((s) => ({ "@id": abs(`/#store-${s.id}`) })),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    name: brand.name,
    url: abs("/"),
    inLanguage: "en-NG",
    publisher: { "@id": abs("/#organization") },
  };
}

export function storesLd() {
  return storeAddresses.map((s, i) => ({
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": abs(`/#store-${s.id}`),
    name: `${brand.name}, ${stores[i].city}`,
    description: brand.description,
    url: abs("/"),
    image: abs("/share.jpg"),
    telephone: phone.tel,
    priceRange: "₦₦₦",
    currenciesAccepted: "NGN",
    address: {
      "@type": "PostalAddress",
      streetAddress: s.street,
      addressLocality: s.locality,
      addressRegion: s.region,
      addressCountry: "NG",
    },
    parentOrganization: { "@id": abs("/#organization") },
  }));
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}
