import Pic from "@/components/Pic";
import type { Product } from "@/lib/catalog";

const SIZES = {
  "span-3": "(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 310px",
  "span-4": "(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 420px",
} as Record<string, string>;

// One piece: its photograph (a second view of it fades in under the pointer), then its name, centred
// under the picture. No price and no collection show until the client confirms them.
export default function ProductTile({
  p,
  span = "span-3",
  eager = false,
}: {
  p: Product;
  span?: string;
  eager?: boolean;
}) {
  const [main, alt] = p.photos;
  const sizes = SIZES[span] ?? SIZES["span-3"];
  return (
    <a className={`tile tile--portrait ${span}`} href={`/products/${p.slug}/`} data-reveal="">
      <div className={`tile__media${alt ? " has-alt" : ""}`}>
        <Pic name={main.name} alt={main.alt} sizes={sizes} priority={eager} style={{ objectPosition: main.focus }} data-subject="product" />
        {alt && <Pic className="tile__alt" name={alt.name} alt="" sizes={sizes} style={{ objectPosition: alt.focus }} />}
        {p.isNew && <span className="tag-new">New</span>}
      </div>
      <div className="tile__head">
        <h3>{p.name}</h3>
      </div>
    </a>
  );
}
