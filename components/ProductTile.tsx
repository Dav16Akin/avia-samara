import { type Product, img, naira } from "@/lib/catalog";

// One sold piece: the photograph, then its name and price inside the tile.
export default function ProductTile({ p, span = "span-3", eager = false }: { p: Product; span?: string; eager?: boolean }) {
  return (
    <a className={`tile tile--portrait ${span}`} href={`/products/${p.slug}/`}>
      <div className="tile__media">
        <img
          src={img(p.photo)}
          alt={p.alt}
          width={640}
          height={800}
          loading={eager ? undefined : "lazy"}
          decoding="async"
          style={{ objectPosition: p.focus }}
          data-source="stand-in"
          data-subject="product"
        />
      </div>
      <div className="tile__head">
        <h3>{p.name}</h3>
        <span className="tile__price" data-assumed>{naira(p.price)}</span>
      </div>
    </a>
  );
}
