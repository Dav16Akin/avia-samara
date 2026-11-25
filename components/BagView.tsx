"use client";

import { AnimatePresence, motion } from "motion/react";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import Pic from "@/components/Pic";
import { products } from "@/lib/catalog";
import { useBag, setQty, countOf } from "@/lib/bag";

export function useLines() {
  const bag = useBag();
  const lines = bag
    .map((l) => ({ ...l, p: products.find((x) => x.slug === l.slug) }))
    .filter((l) => l.p) as { slug: string; size: string; qty: number; p: (typeof products)[number] }[];
  return { lines, count: countOf(bag) };
}

export function BagView() {
  const { lines, count } = useLines();

  if (!lines.length) {
    return (
      <div className="empty">
        <p>Your bag is empty.</p>
        <a className="link" href="/shop/">Browse all pieces</a>
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
                <Pic name={l.p.photos[0].name} alt={l.p.photos[0].alt} sizes="96px" style={{ objectPosition: l.p.photos[0].focus }} />
              </a>
              <div>
                <a className="bag__name" href={`/products/${l.slug}/`}>{l.p.name}</a>
                <p className="bag__meta">{l.size === "fitted" ? "Fitted to you" : `Size ${l.size}`}</p>
              </div>
              <div className="bag__side">
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
          <dt>Pieces</dt>
          <dd>{count}</dd>
          <dt>Prices and delivery</dt>
          <dd>Confirmed on WhatsApp</dd>
        </dl>
        <a className="btn btn--buy" href="/checkout/">Go to checkout</a>
      </aside>
    </div>
  );
}

// The order as the checkout shows it; CheckoutForm writes the same lines into the WhatsApp message.
export function CheckoutSummary() {
  const { lines } = useLines();

  return (
    <aside className="sum span-4 start-9" aria-labelledby="sum-h">
      <h2 id="sum-h">Your order</h2>
      {lines.length ? (
        <>
          <ul>
            {lines.map((l) => (
              <li key={l.slug + l.size}>
                <span>{l.p.name}{l.size === "fitted" ? "" : `, ${l.size}`}</span>
                <span>× {l.qty}</span>
              </li>
            ))}
          </ul>
          <p className="t-small muted">We reply on WhatsApp with the prices and the delivery cost before you pay.</p>
        </>
      ) : (
        <p>Your bag is empty.</p>
      )}
    </aside>
  );
}
