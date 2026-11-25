// Catalogue for the Avia Samara shop.
// The collections and their descriptions come from the client's brief. The pieces are the client's own
// lookbook (the PICTURES shoot, media-src/images/look-*): one entry per outfit, every photograph of it.
// NAMES, PRICES AND COLLECTION PLACEMENTS ARE OURS, NOT THE CLIENT'S: correct them here (prices are
// marked data-assumed wherever they show).

import type { MediaName } from "@/components/Pic";

export type Photo = { name: MediaName; alt: string; focus?: string };

export type Collection = {
  slug: string;
  no: string;
  name: string;
  short: string; // one grey line, 30 characters at most
  line: string; // the client's own description
  group: "Traditional" | "Modern";
  madeToOrder?: boolean;
  media: Photo; // the collection's picture
  hover: Photo; // a second piece from it, shown on hover
};

export type Product = {
  slug: string;
  name: string;
  collection: string; // collection slug
  price: number; // NGN, assumed
  photos: Photo[]; // the first is the main picture, the second shows on hover
  detail: string;
  isNew?: boolean;
};

export const collections: Collection[] = [
  {
    slug: "royalty",
    no: "01",
    name: "Samara Royalty",
    short: "Caftans and agbadas",
    line: "Luxury caftans, agbadas and distinguished African traditional wear.",
    group: "Traditional",
    media: { name: "look-royal-blue-agbada-1", alt: "A man in a royal blue agbada over a black embroidered panel, holding a carved staff", focus: "50% 30%" },
    hover: { name: "look-black-brocade-trim-agbada-1", alt: "A man in a black agbada edged with bronze brocade", focus: "50% 30%" },
  },
  {
    slug: "urban",
    no: "02",
    name: "Samara Urban",
    short: "Streetwear and shirts",
    line: "Contemporary streetwear, stylish shirts, statement trousers and urban luxury outfits.",
    group: "Modern",
    media: { name: "look-embroidered-denim-set-1", alt: "A man in an embroidered denim jacket and trousers", focus: "50% 30%" },
    hover: { name: "look-plum-paisley-set-1", alt: "A man in a plum paisley shirt and shorts with sandals", focus: "50% 30%" },
  },
  {
    slug: "bespoke",
    no: "03",
    name: "Samara Bespoke",
    short: "Custom-made suits",
    line: "Custom-made suits, tailored jackets, three-piece suits and sophisticated formalwear.",
    group: "Modern",
    madeToOrder: true,
    media: { name: "look-cream-wrap-jacket-set-1", alt: "A man in a cream wrap jacket, brown trousers and a brown hat", focus: "50% 30%" },
    hover: { name: "look-pink-quilted-jacket-set-2", alt: "A man in a pale pink quilted jacket over a burgundy top and trousers", focus: "50% 30%" },
  },
  {
    slug: "signature",
    no: "04",
    name: "Samara Signature",
    short: "Designer caftans",
    line: "Exclusive designer caftans, built-in waistcoat designs and unique statement pieces.",
    group: "Traditional",
    media: { name: "look-black-brocade-panel-caftan-1", alt: "A man in a long black caftan with a bronze brocade panel at the waist", focus: "50% 30%" },
    hover: { name: "look-black-jacquard-set-1", alt: "A man in a black jacquard top and trousers, leaning on a carved cane", focus: "50% 30%" },
  },
  {
    slug: "ceremonial",
    no: "05",
    name: "Samara Ceremonial",
    short: "Weddings and engagements",
    line: "Luxury outfits for weddings, engagements, special occasions and celebrations.",
    group: "Traditional",
    media: { name: "look-floral-grand-agbada-1", alt: "A man in a black and gold floral grand agbada and beaded crown, holding a tall carved staff", focus: "50% 30%" },
    hover: { name: "look-gold-brocade-wrapper-set-1", alt: "A man in a gold brocade shirt, a red wrapper and a brown hat, with a carved staff", focus: "50% 30%" },
  },
  {
    slug: "avant-garde",
    no: "06",
    name: "Samara Avant-Garde",
    short: "Experimental menswear",
    line: "Experimental fashion, unconventional silhouettes, deconstructed designs and bold creative menswear.",
    group: "Modern",
    media: { name: "look-red-fringe-tunic-set-1", alt: "A man in a red and black tunic and trousers cut into layers of fringe", focus: "50% 30%" },
    hover: { name: "look-green-web-stitch-set-2", alt: "A man in a green shirt-jacket stitched with a web pattern, leaning on a chair", focus: "50% 30%" },
  },
];

const v = (name: MediaName, alt: string, focus = "50% 30%"): Photo => ({ name, alt, focus });

export const products: Product[] = [
  // 01 Royalty
  {
    slug: "royal-blue-agbada", name: "Royal blue and black agbada", collection: "royalty", price: 420000, isNew: true,
    detail: "A royal blue agbada worn open over a long black caftan embroidered with a raised geometric panel, with matching trousers.",
    photos: [
      v("look-royal-blue-agbada-1", "A man in a royal blue agbada over a black embroidered panel, holding a carved staff"),
      v("look-royal-blue-agbada-2", "The royal blue agbada from the side, the black panel's raised embroidery in view"),
    ],
  },
  {
    slug: "black-brocade-trim-agbada", name: "Black agbada with brocade trim", collection: "royalty", price: 385000,
    detail: "A flowing black agbada edged in bronze brocade, over a matching caftan with a brocade panel and wide sleeves.",
    photos: [
      v("look-black-brocade-trim-agbada-1", "A man in a black agbada edged with bronze brocade, hands clasped"),
      v("look-black-brocade-trim-agbada-2", "The black agbada with the sleeves held open to show the brocade lining"),
      v("look-black-brocade-trim-agbada-3", "A closer view of the brocade trim and the caftan's panel", "50% 25%"),
      v("look-black-brocade-trim-agbada-4", "The black agbada from the back, a wide brocade band down the centre"),
    ],
  },
  // 02 Urban
  {
    slug: "embroidered-denim-set", name: "Embroidered denim set", collection: "urban", price: 145000, isNew: true,
    detail: "A cropped denim jacket with tonal stitching and embroidered flowers, over wide patched denim trousers.",
    photos: [
      v("look-embroidered-denim-set-1", "A man in an embroidered denim jacket and trousers, one hand on his hip"),
      v("look-embroidered-denim-set-2", "The denim set full length, worn with black and white boots"),
      v("look-embroidered-denim-set-3", "The denim set in motion, one knee raised"),
      v("look-embroidered-denim-set-4", "The denim set from the side, leaning back"),
    ],
  },
  {
    slug: "burgundy-print-set", name: "Burgundy print shirt and trousers", collection: "urban", price: 98000,
    detail: "A short-sleeved shirt and straight trousers in a burgundy print, with a contrast black placket.",
    photos: [v("look-burgundy-print-set-1", "A man in a burgundy print short-sleeved shirt and matching trousers")],
  },
  {
    slug: "plum-paisley-set", name: "Plum paisley shirt and shorts", collection: "urban", price: 86000,
    detail: "A long-sleeved plum shirt in a raised paisley weave with matching long shorts.",
    photos: [v("look-plum-paisley-set-1", "A man in a plum paisley shirt and shorts with sandals, arms crossed")],
  },
  {
    slug: "plum-geometric-set", name: "Plum geometric print shirt", collection: "urban", price: 92000,
    detail: "A wide-cut shirt in a plum and pink geometric weave, worn with matching trousers.",
    photos: [v("look-plum-geometric-set-1", "A man in a plum geometric print shirt, hands together", "50% 25%")],
  },
  // 03 Bespoke (made to order)
  {
    slug: "cream-wrap-jacket-set", name: "Cream wrap jacket and brown trousers", collection: "bespoke", price: 260000, isNew: true,
    detail: "A cropped cream wrap jacket with wide sleeves and a single button, over high-waisted brown trousers. Cut to your measurements.",
    photos: [
      v("look-cream-wrap-jacket-set-1", "A man in a cream wrap jacket, brown trousers and a brown hat"),
      v("look-cream-wrap-jacket-set-2", "A closer view of the cream wrap jacket's collar and pin", "50% 25%"),
      v("look-cream-wrap-jacket-set-3", "The cream wrap jacket with arms raised, the wide sleeves open"),
      v("look-cream-wrap-jacket-set-4", "The cream jacket and brown trousers mid-stride"),
      v("look-cream-wrap-jacket-set-5", "The cream jacket and brown trousers, standing square"),
    ],
  },
  {
    slug: "pink-quilted-jacket-set", name: "Pink quilted jacket and burgundy set", collection: "bespoke", price: 285000,
    detail: "A pale pink jacket with quilted sleeves and back, over a sleeveless burgundy zip top and flared trousers. Cut to your measurements.",
    photos: [
      v("look-pink-quilted-jacket-set-1", "A man in a pale pink quilted jacket over a burgundy top and flared trousers"),
      v("look-pink-quilted-jacket-set-2", "A closer view of the pink jacket's quilting and buttons", "50% 25%"),
      v("look-pink-quilted-jacket-set-3", "The burgundy top with the pink jacket over one shoulder"),
      v("look-pink-quilted-jacket-set-4", "The sleeveless burgundy top and flared trousers alone"),
    ],
  },
  // 04 Signature
  {
    slug: "black-brocade-panel-caftan", name: "Black caftan with brocade panel", collection: "signature", price: 210000,
    detail: "A long black caftan with a built-in brocade panel wrapped at the waist and a stand collar.",
    photos: [
      v("look-black-brocade-panel-caftan-1", "A man in a long black caftan with a bronze brocade panel at the waist"),
      v("look-black-brocade-panel-caftan-2", "The black caftan from the side, the brocade panel falling to the hem"),
    ],
  },
  {
    slug: "black-jacquard-set", name: "Black jacquard top and trousers", collection: "signature", price: 175000,
    detail: "A wide-sleeved top in black jacquard with a pointed yoke and banded sleeves, with straight black trousers.",
    photos: [
      v("look-black-jacquard-set-1", "A man in a black jacquard top and trousers, leaning on a carved cane"),
      v("look-black-jacquard-set-2", "A closer view of the black jacquard top's yoke and banded sleeves", "50% 25%"),
    ],
  },
  {
    slug: "cream-jacquard-set", name: "Cream jacquard top and trousers", collection: "signature", price: 165000,
    detail: "A boxy cream jacquard top with short wide sleeves and matching wide trousers.",
    photos: [v("look-cream-jacquard-set-1", "A man in a cream jacquard top and wide trousers")],
  },
  // 05 Ceremonial
  {
    slug: "floral-grand-agbada", name: "Black and gold floral grand agbada", collection: "ceremonial", price: 520000, isNew: true,
    detail: "A full grand agbada in black and gold floral cloth, worn with a beaded crown for the biggest days.",
    photos: [
      v("look-floral-grand-agbada-1", "A man in a black and gold floral grand agbada and beaded crown, holding a tall carved staff"),
      v("look-floral-grand-agbada-2", "The floral grand agbada seated, the cloth spread across the floor"),
      v("look-floral-grand-agbada-3", "The floral grand agbada seated on a sofa between red cushions", "50% 40%"),
    ],
  },
  {
    slug: "gold-brocade-wrapper-set", name: "Gold brocade shirt and red wrapper", collection: "ceremonial", price: 460000,
    detail: "A long gold brocade shirt with a carved front panel, worn over a red jacquard wrapper.",
    photos: [
      v("look-gold-brocade-wrapper-set-1", "A man in a gold brocade shirt, a red wrapper and a brown hat, with a carved staff"),
      v("look-gold-brocade-wrapper-set-2", "A closer view of the gold brocade shirt's front panel, seated", "50% 25%"),
      v("look-gold-brocade-wrapper-set-3", "The gold brocade shirt and red wrapper from the back"),
    ],
  },
  // 06 Avant-Garde
  {
    slug: "red-fringe-tunic-set", name: "Red fringe tunic and trousers", collection: "avant-garde", price: 240000,
    detail: "A red and black jacquard tunic and trousers cut into tiers of hanging fringe.",
    photos: [
      v("look-red-fringe-tunic-set-1", "A man in a red and black tunic and trousers cut into layers of fringe"),
      v("look-red-fringe-tunic-set-2", "A closer view of the red fringe tunic", "50% 25%"),
      v("look-red-fringe-tunic-set-3", "The red fringe tunic and trousers from the side, mid-step"),
    ],
  },
  {
    slug: "green-web-stitch-set", name: "Green web-stitch shirt and trousers", collection: "avant-garde", price: 198000,
    detail: "A boxy green shirt-jacket stitched with a spider-web pattern front and back, with pleated green trousers.",
    photos: [
      v("look-green-web-stitch-set-1", "A man in a green web-stitched shirt-jacket and trousers"),
      v("look-green-web-stitch-set-2", "The green shirt-jacket, leaning on a chair, the web stitching across the chest"),
      v("look-green-web-stitch-set-3", "The green shirt-jacket from the back, a full web stitched across it"),
      v("look-green-web-stitch-set-4", "The green set in a wide stance, one arm out"),
    ],
  },
  {
    slug: "navy-monogram-set", name: "Navy AS monogram jacket and trousers", collection: "avant-garde", price: 310000,
    detail: "A navy wrap jacket with the AS monogram embroidered in red beads across the back, over wide navy trousers.",
    photos: [
      v("look-navy-monogram-set-1", "A man in a navy wrap jacket and wide trousers with a red hat"),
      v("look-navy-monogram-set-2", "The navy jacket from the back, the AS monogram in red beads", "50% 35%"),
      v("look-navy-monogram-set-3", "The navy set from the back, full length"),
      v("look-navy-monogram-set-4", "The navy set, one arm raised"),
      v("look-navy-monogram-set-5", "The navy set leaning on a bar stool"),
    ],
  },
];

export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");

/* A photograph's address: the 640 JPEG (share cards, structured data, anything that wants one file)
   or a WebP width from the pipeline. */
export const photoUrl = (name: MediaName, w?: 320 | 640 | 1280 | 1920) => (w ? `/media/img/${name}-${w}.webp` : `/media/img/${name}-640.jpg`);

export const collectionOf = (slug: string) => collections.find((c) => c.slug === slug)!;
export const productsIn = (slug: string) => products.filter((p) => p.collection === slug);
export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
