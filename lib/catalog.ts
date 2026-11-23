// Catalogue for the Avia Samara shop.
// The collections and their descriptions come from the client's brief (more will follow).
// Every product name, price and photograph below is a STAND-IN for the demo:
// replace them with the client's real pieces, prices and lookbook photographs.

import type { MediaName } from "@/components/Pic";

export type Collection = {
  slug: string;
  no: string;
  name: string;
  short: string; // one grey line, 30 characters at most
  line: string; // the client's own description
  photo: number; // Pexels photo id of the stand-in
  focus: string; // object-position for square crops
  group: "Traditional" | "Modern";
  madeToOrder?: boolean;
  // the client's own photograph for the collection's tile (lib/media.json); the Pexels stand-in
  // above stays for the pages not yet given one
  media?: { name: MediaName; alt: string; focus: string };
};

export type Product = {
  slug: string;
  name: string;
  collection: string; // collection slug
  price: number; // NGN, assumed
  photo: number;
  focus: string;
  alt: string;
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
    photo: 31485635,
    focus: "50% 22%",
    group: "Traditional",
    media: { name: "film-white-agbada", alt: "A man in a white agbada with purple embroidery and a cap, holding a carved staff, in the store's mirrored booth", focus: "50% 30%" },
  },
  {
    slug: "urban",
    no: "02",
    name: "Samara Urban",
    short: "Streetwear and shirts",
    line: "Contemporary streetwear, stylish shirts, statement trousers and urban luxury outfits.",
    photo: 35347257,
    focus: "50% 30%",
    group: "Modern",
    media: { name: "red-set-standing", alt: "A man in a red jacket and wide trousers patterned with black scrollwork, gold chains and aviators", focus: "50% 28%" },
  },
  {
    slug: "bespoke",
    no: "03",
    name: "Samara Bespoke",
    short: "Custom-made suits",
    line: "Custom-made suits, tailored jackets, three-piece suits and sophisticated formalwear.",
    photo: 18348433,
    focus: "50% 18%",
    group: "Modern",
    media: { name: "film-suit", alt: "A grey patterned suit jacket with black satin lapels over matching trousers on a brass rail", focus: "50% 35%" },
    madeToOrder: true,
  },
  {
    slug: "signature",
    no: "04",
    name: "Samara Signature",
    short: "Designer caftans",
    line: "Exclusive designer caftans, built-in waistcoat designs and unique statement pieces.",
    photo: 35331756,
    focus: "50% 20%",
    group: "Traditional",
    media: { name: "cream-tunic-hat", alt: "A man in a cream tunic with stitched curves and cut-out sleeves, grey wide trousers and a black hat", focus: "50% 25%" },
  },
  {
    slug: "ceremonial",
    no: "05",
    name: "Samara Ceremonial",
    short: "Weddings and engagements",
    line: "Luxury outfits for weddings, engagements, special occasions and celebrations.",
    photo: 34445229,
    focus: "50% 25%",
    group: "Traditional",
    media: { name: "film-window", alt: "Store-window mannequins in a gold brocade top with coral beads and a burgundy hooded robe", focus: "40% 45%" },
  },
  {
    slug: "avant-garde",
    no: "06",
    name: "Samara Avant-Garde",
    short: "Experimental menswear",
    line: "Experimental fashion, unconventional silhouettes, deconstructed designs and bold creative menswear.",
    photo: 6109439,
    focus: "50% 45%",
    group: "Modern",
    media: { name: "pinstripe-mannequin", alt: "A gold-headed mannequin in an asymmetric black pinstripe jacket and trousers traced with white outlines", focus: "50% 30%" },
  },
];

export const products: Product[] = [
  // 01 Royalty
  { slug: "burgundy-embroidered-agbada", name: "Burgundy embroidered agbada", collection: "royalty", price: 285000, photo: 31485635, focus: "50% 25%", alt: "A man in a burgundy agbada with gold embroidery on the chest and a matching cap", detail: "Three-piece agbada with an embroidered chest panel, inner caftan and trousers." },
  { slug: "sky-blue-agbada-set", name: "Sky blue agbada set", collection: "royalty", price: 310000, photo: 8526759, focus: "50% 30%", alt: "A man in a sky blue agbada with cream embroidery down the front", detail: "Three-piece agbada with cream embroidery down the front and at the cuffs.", isNew: true },
  { slug: "royal-blue-agbada", name: "Royal blue agbada", collection: "royalty", price: 265000, photo: 30452332, focus: "50% 35%", alt: "A man in a royal blue agbada with white embroidery, standing against a dark wall", detail: "Wide-sleeved agbada with white embroidery, worn over a matching caftan." },
  { slug: "pale-blue-grand-agbada", name: "Pale blue grand agbada", collection: "royalty", price: 340000, photo: 35100572, focus: "50% 30%", alt: "A man in a pale blue grand agbada with tonal embroidery and a matching cap", detail: "Full-cut grand agbada with tonal embroidery across the chest." },
  // 02 Urban
  { slug: "green-camp-shirt-and-shorts", name: "Green camp shirt and shorts", collection: "urban", price: 68000, photo: 35347257, focus: "50% 35%", alt: "A man in a dark green camp shirt, long shorts and a bucket hat", detail: "Boxy camp-collar shirt with matching long shorts." },
  { slug: "checked-overshirt", name: "Checked overshirt", collection: "urban", price: 54000, photo: 16637480, focus: "50% 30%", alt: "A man in a navy and white checked overshirt and black trousers, seen from the side", detail: "Heavy checked overshirt with a straight hem and two chest pockets.", isNew: true },
  { slug: "washed-denim-jacket", name: "Washed denim jacket", collection: "urban", price: 72000, photo: 11434887, focus: "50% 35%", alt: "A man in a washed denim jacket, white T-shirt and slim trousers on a city street", detail: "Mid-wash denim jacket cut close through the shoulder." },
  { slug: "blue-printed-sweatshirt", name: "Blue printed sweatshirt", collection: "urban", price: 46000, photo: 29977116, focus: "50% 40%", alt: "A man crouching in a blue printed sweatshirt, grey trousers and a white cap", detail: "Loop-back cotton sweatshirt with a tonal print across the chest." },
  // 03 Bespoke (made to order)
  { slug: "pinstripe-three-piece-suit", name: "Pinstripe three-piece suit", collection: "bespoke", price: 420000, photo: 18348433, focus: "50% 22%", alt: "A man in a dark pinstripe three-piece suit with the jacket over one shoulder", detail: "Jacket, waistcoat and trousers in dark pinstripe cloth, cut to your measurements." },
  { slug: "black-two-piece-suit", name: "Black two-piece suit", collection: "bespoke", price: 360000, photo: 19934394, focus: "50% 25%", alt: "A man in a slim black two-piece suit with a white shirt and black tie", detail: "Single-breasted jacket and flat-front trousers in black suiting." },
  { slug: "black-pinstripe-lounge-suit", name: "Black pinstripe lounge suit", collection: "bespoke", price: 395000, photo: 6766363, focus: "50% 30%", alt: "A man seated in a black pinstripe suit and white band-collar shirt", detail: "Soft-shouldered lounge suit with a matching waistcoat." },
  { slug: "black-evening-jacket-and-trousers", name: "Black evening jacket and trousers", collection: "bespoke", price: 380000, photo: 10528698, focus: "50% 25%", alt: "A man in a black tailored jacket, roll-neck and trousers with a wide-brimmed hat", detail: "Evening jacket with a peak lapel and tapered trousers.", isNew: true },
  // 04 Signature
  { slug: "cream-embroidered-caftan", name: "Cream embroidered caftan", collection: "signature", price: 165000, photo: 19583851, focus: "50% 25%", alt: "A man seated in a cream caftan with dark embroidery on the placket and a patterned cap", detail: "Long caftan with an embroidered placket and matching trousers.", isNew: true },
  { slug: "mint-caftan", name: "Mint caftan", collection: "signature", price: 148000, photo: 35331756, focus: "50% 25%", alt: "A man in a pale mint caftan with a chest pocket and an embroidered cap", detail: "Knee-length caftan with a concealed placket and one chest pocket." },
  { slug: "white-caftan-set", name: "White caftan set", collection: "signature", price: 156000, photo: 33356780, focus: "50% 30%", alt: "A man in a white caftan set and black cap against a red wall", detail: "Two-piece caftan set with a stand collar and cropped trousers." },
  { slug: "rust-long-caftan", name: "Rust long caftan", collection: "signature", price: 172000, photo: 29133967, focus: "50% 40%", alt: "A man in an ankle-length rust caftan seen from behind", detail: "Ankle-length caftan in rust cloth with side slits." },
  // 05 Ceremonial
  { slug: "navy-corded-agbada", name: "Navy corded agbada", collection: "ceremonial", price: 375000, photo: 6109557, focus: "50% 30%", alt: "A man in a navy jacquard agbada with white corded embroidery and a woven cap", detail: "Jacquard agbada with white corded embroidery at the neck." },
  { slug: "white-embroidered-agbada", name: "White embroidered agbada", collection: "ceremonial", price: 390000, photo: 34445229, focus: "50% 28%", alt: "A man in a white agbada with red and gold embroidery, holding a leather clutch", detail: "White agbada with red and gold embroidery on the chest." },
  { slug: "cream-agbada-set", name: "Cream agbada set", collection: "ceremonial", price: 355000, photo: 30075301, focus: "50% 35%", alt: "A man seated in a cream agbada set with a matching cap", detail: "Three-piece agbada set in cream with matching cap." },
  { slug: "striped-woven-agbada", name: "Striped woven agbada", collection: "ceremonial", price: 410000, photo: 7122397, focus: "50% 60%", alt: "Two men in woven striped agbadas, one cream and one blue, standing in a field at dusk", detail: "Hand-woven striped agbada with appliqué knots, in cream or blue." },
  // 06 Avant-Garde
  { slug: "black-draped-robe", name: "Black draped robe", collection: "avant-garde", price: 198000, photo: 6109439, focus: "50% 45%", alt: "A man in a black draped robe over a white shirt, holding a yellow frame", detail: "Open draped robe worn over a long white shirt." },
  { slug: "open-blazer-and-check-trousers", name: "Open blazer and check trousers", collection: "avant-garde", price: 215000, photo: 14965554, focus: "50% 30%", alt: "A man in an open navy blazer and check trousers, wearing sunglasses", detail: "Unlined blazer cut to wear open, with high-waisted check trousers." },
  { slug: "patchwork-trousers-and-vest", name: "Patchwork trousers and vest", collection: "avant-garde", price: 124000, photo: 16864839, focus: "50% 45%", alt: "A man crouching in patchwork woven trousers and a white vest against a rust wall", detail: "Trousers pieced from four woven cloths, with a ribbed vest." },
  { slug: "leather-jacket-set", name: "Leather jacket set", collection: "avant-garde", price: 268000, photo: 35587808, focus: "50% 35%", alt: "Two men in black leather jackets, photographed in black and white", detail: "Boxy leather jacket with matching wide trousers." },
];

export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");

export const img = (id: number, w: 320 | 640 | 1280 | 1920 = 640) => `/images/p-${id}-${w}.jpg`;

export const collectionOf = (slug: string) => collections.find((c) => c.slug === slug)!;
export const productsIn = (slug: string) => products.filter((p) => p.collection === slug);
export const fromPrice = (slug: string) => Math.min(...productsIn(slug).map((p) => p.price));

// Stand-in photographs used outside the catalogue (hero, fitting steps).
export const extraPhotos = [6766363, 6461169, 6766365, 7998238];
export const allPhotoIds = Array.from(new Set([...products.map((p) => p.photo), ...extraPhotos]));
