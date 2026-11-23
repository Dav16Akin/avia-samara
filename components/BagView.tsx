"use client";

import { AnimatePresence, motion } from "motion/react";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { products, collectionOf, img, naira } from "@/lib/catalog";
import { useBag, setQty, countOf } from "@/lib/bag";

function useLines() {
  const bag = useBag();
  const lines = bag
    .map((l) => ({ ...l, p: products.find((x) => x.slug === l.slug) }))
    .filter((l) => l.p) as { slug: string; size: string; qty: number; p: (typeof products)[number] }[];
  const total = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
  return { lines, total, count: countOf(bag) };
}

export function BagView() {
  const { lines, total, count } = useLines();

  if (!lines.length) {
    return (
      <div className="empty">
        <p>Your bag is empty.</p>
        <a className="btn btn--primary" href="/shop/">Shop the collection</a>
      </div>
    );
  }

  return (
    <div className="grid bag">
      <ul className="bag__lines span-7">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.li className="bag__line" key={l.slug + l.size} layout exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <a className="bag__thumb" href={`/products/${l.slug}/`}>
                <img src={img(l.p.photo)} alt={l.p.alt} width={640} height={800} style={{ objectPosition: l.p.focus }} />
              </a>
              <div>
                <a className="bag__name" href={`/products/${l.slug}/`}>{l.p.name}</a>
                <p className="bag__meta">{collectionOf(l.p.collection).name} · {l.size === "fitted" ? "Fitted to you" : `Size ${l.size}`}</p>
              </div>
              <div className="bag__side">
                <span>{naira(l.p.price * l.qty)}</span>
                <span className="qty">
                  <button type="button" aria-label={`Remove one ${l.p.name}`} onClick={() => setQty(l.slug, l.size, l.qty - 1)}>
                    <MinusIcon size={16} aria-hidden="true" />
                  </button>
                  <output aria-label="Quantity">{l.qty}</output>
                  <button type="button" aria-label={`Add one ${l.p.name}`} onClick={() => setQty(l.slug, l.size, l.qty + 1)}>
                    <PlusIcon size={16} aria-hidden="true" />
                  </button>
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <aside className="sum span-4 start-9" aria-labelledby="sum-h">
        <h2 id="sum-h">Order summary</h2>
        <dl>
          <dt>{count} {count === 1 ? "piece" : "pieces"}</dt>
          <dd>{naira(total)}</dd>
          <dt>Delivery</dt>
          <dd>Priced at checkout</dd>
          <dt className="sum__total">Subtotal</dt>
          <dd className="sum__total">{naira(total)}</dd>
        </dl>
        <a className="btn btn--primary" href="/checkout/">Go to checkout</a>
      </aside>
    </div>
  );
}

// The order as the checkout shows it, and as plain text in the order request.
export function CheckoutSummary() {
  const { lines, total } = useLines();
  const text = lines.map((l) => `${l.qty} x ${l.p.name}, ${l.size === "fitted" ? "fitted" : `size ${l.size}`}, ${naira(l.p.price * l.qty)}`).join("\n");

  return (
    <aside className="sum span-4 start-9" aria-labelledby="sum-h">
      <h2 id="sum-h">Your order</h2>
      {lines.length ? (
        <>
          <ul>
            {lines.map((l) => (
              <li key={l.slug + l.size}>
                <span>{l.qty} × {l.p.name}{l.size === "fitted" ? "" : `, ${l.size}`}</span>
                <span>{naira(l.p.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <dt className="sum__total">Subtotal</dt>
            <dd className="sum__total">{naira(total)}</dd>
          </dl>
        </>
      ) : (
        <p>Your bag is empty.</p>
      )}
      <input type="hidden" name="order" form="checkout-form" value={text} readOnly />
    </aside>
  );
}
