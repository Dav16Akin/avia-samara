import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import KitScripts from "@/components/KitScripts";
import CartDrawer from "@/components/CartDrawer";
import Reveal from "@/components/Reveal";
import { Splash } from "@/components/Brand";
import JsonLd from "@/components/JsonLd";
import { brand, organizationLd, siteUrl, websiteLd } from "@/lib/site";
import "./globals.css";

// The brand's own faces, read off the logo and the shop sign: Cinzel (the inscriptional capitals of
// "Men's Boutique & Luxury Store" and the AS monogram) for headings, Montserrat (the AVIA-SAMARA
// wordmark and the lit sign) for everything else. next/font self-hosts both at build time, so the
// page makes no request to Google and the fallbacks are size-matched (no layout shift).
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cinzel", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-montserrat", display: "swap" });

const title = "Avia Samara | Agbadas, Caftans & Bespoke Suits for Men in Lagos and Benin City";
const description =
  "Avia Samara is a men's boutique and luxury store in Lekki, Lagos and GRA, Benin City: agbadas, caftans, custom-made suits and streetwear, every piece fitted to you. Order on WhatsApp or book a fitting.";

// Every page's title fills the template ("Samara Royalty | Avia Samara"); canonical links, the share
// image and the sitemap resolve against metadataBase (lib/site.ts), never localhost on Vercel.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Avia Samara" },
  description,
  applicationName: brand.name,
  keywords: [
    "Avia Samara",
    "agbada",
    "agbada Lagos",
    "caftan for men",
    "kaftan Nigeria",
    "bespoke suits Lagos",
    "tailor Lekki",
    "menswear Benin City",
    "Nigerian traditional wear for men",
    "luxury men's boutique Lagos",
    "streetwear Lagos",
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  category: "fashion",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    siteName: brand.name,
    locale: "en_NG",
    url: "/",
    title,
    description,
    images: [{ url: "/share.jpg", alt: "Avia Samara, men's boutique and luxury store" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/share.jpg"] },
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-48.png", type: "image/png", sizes: "48x48" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  other: { "site-kind": "other", "page-type": "product" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0c0b",
};

// The palette is the client's design.md (monochrome: #111111 on #ffffff, no accent), printed by
// `start.mjs brand`, and the logo is black on white too: the store film supplies the warm light.
// --brand-blue is the royal blue of the client's second logo (the upper half of the AS on black), kept
// for a few chosen places only: the collections banner, the opening screen's monogram and the menu card.
// The faces are the brand's own (above), in place of the dealt Onest.
const tokens = `:root {
  --p-bg: #ffffff; --p-surface: #f5f5f5; --p-ink: #111111; --p-muted: #686869;
  --p-accent: #111111; --p-accent-ink: #ffffff; --p-action: #111111; --p-action-ink: #ffffff;
  --p-inv-bg: #111111; --p-inv-surface: #1e1e1e; --p-inv-ink: #ffffff; --p-inv-muted: #9a9a9a;
  --brand-blue: #2b5394; --brand-blue-ink: #ffffff;
  --p-inv-accent: #ffffff; --p-inv-accent-ink: #111111; --p-inv-action: #ffffff; --p-inv-action-ink: #111111;
  --font-display: var(--font-cinzel), "Trajan Pro", "Times New Roman", serif;
  --font-text: var(--font-montserrat), system-ui, sans-serif;
  --display-weight: 400;
  --display-tracking: 0.01em;
  --display-tracking-xl: 0;
}`;

// The opening screen shows once per browser session (every link is a full page load, so without the
// flag it would replay on each click), and shorter under reduced motion. It shows again when a visitor
// comes back to the home page through the logo or a home link (KitScripts leaves 'as-splash-home' for
// it), and with ?splash on any address (for a demo). While it shows, the hero's entrance and the kit's scripts wait for it to lift
// (window.__splash, read by KitScripts), so the entrance plays as the curtain rises, not under it.
const guards = `(function(){var d=document.documentElement,w=0,on=false;
var force=/[?&]splash\b/.test(location.search);
try{if(sessionStorage.getItem('as-splash-home')){sessionStorage.removeItem('as-splash-home');force=force||location.pathname==='/'}
on=force||!sessionStorage.getItem('as-splash');if(on)sessionStorage.setItem('as-splash','1')}catch(e){on=true}
if(on){w=matchMedia('(prefers-reduced-motion: reduce)').matches?700:1650;d.classList.add('splash-on');
window.__splash=new Promise(function(r){setTimeout(r,w)});setTimeout(function(){d.classList.remove('splash-on')},w+750)}
d.classList.add('m-enter');setTimeout(function(){d.classList.add('m-enter-done')},700+w);
d.classList.add('mo-js');setTimeout(function(){d.classList.add('mo-safe')},2500+w)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${cinzel.variable} ${montserrat.variable}`} data-type="product" data-radius="sharp" data-buttons="pill" data-motion="" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/backgrounds/backgrounds.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <style dangerouslySetInnerHTML={{ __html: tokens }} />
        <link rel="stylesheet" href="/site.css" />
        <script dangerouslySetInnerHTML={{ __html: guards }} />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
        <link rel="modulepreload" href="/assets/moments/pinned-chapters/moment.js" />
        <link rel="modulepreload" href="/assets/moments/picture-develops/moment.js" />
      </head>
      <body>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <Splash />
        {children}
        <CartDrawer />
        <Reveal />
        <KitScripts />
      </body>
    </html>
  );
}
