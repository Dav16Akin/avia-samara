"use client";

import { useEffect, useRef } from "react";
import { MinusIcon, PlusIcon, XIcon, TrashIcon } from "@phosphor-icons/react";
import Pic from "@/components/Pic";
import { useLines } from "@/components/BagView";
import { CART_OPEN, setQty } from "@/lib/bag";

/* The side cart: a panel from the right with the bag's pieces and their quantities (no prices until the
   client confirms them), and the
   way on to checkout. A modal <dialog> (the top layer, Esc to close, focus kept inside it). It opens
   after "Add to bag" and from the bag icon, whose link to /bag/ still works without a script and on
   the bag and checkout pages, where the panel would only repeat the page. */
export default function CartDrawer() {
  const ref = useRef<HTMLDialogElement>(null);
  const { lines, count } = useLines();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const open = () => {
      if (!d.open) d.showModal();
    };
    const onBagClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.(".nav__icon--bag");
      if (!a) return;
      if (/^\/(bag|checkout)\//.test(window.location.pathname)) return;
      e.preventDefault();
      open();
    };
    // a click on the shade outside the panel closes it
    const onDialogClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    window.addEventListener(CART_OPEN, open);
    document.addEventListener("click", onBagClick);
    d.addEventListener("click", onDialogClick);
    return () => {
      window.removeEventListener(CART_OPEN, open);
      document.removeEventListener("click", onBagClick);
      d.removeEventListener("click", onDialogClick);
    };
  }, []);

  return (
    <dialog ref={ref} className="cart" aria-labelledby="cart-h">
      <div className="cart__panel">
        <header className="cart__head">
          <h2 id="cart-h">
            Your bag <span className="cart__count">{count}</span>
          </h2>
          <button className="cart__close" type="button" aria-label="Close the bag" onClick={() => ref.current?.close()}>
            <XIcon size={20} aria-hidden="true" />
          </button>
        </header>

        {lines.length ? (
          <ul className="cart__lines">
            {lines.map((l) => (
              <li className="cart__line" key={l.slug + l.size}>
                <a className="cart__thumb" href={`/products/${l.slug}/`}>
                  <Pic name={l.p.photos[0].name} alt={l.p.photos[0].alt} sizes="88px" style={{ objectPosition: l.p.photos[0].focus }} />
                </a>
                <div className="cart__info">
                  <a className="cart__name" href={`/products/${l.slug}/`}>{l.p.name}</a>
                  <span className="cart__meta">Fitted to you</span>
                  <span className="qty">
                    <button type="button" aria-label={`Remove one ${l.p.name}`} onClick={() => setQty(l.slug, l.size, l.qty - 1)}>
                      <MinusIcon size={14} aria-hidden="true" />
                    </button>
                    <output aria-label="Quantity">{l.qty}</output>
                    <button type="button" aria-label={`Add one ${l.p.name}`} onClick={() => setQty(l.slug, l.size, l.qty + 1)}>
                      <PlusIcon size={14} aria-hidden="true" />
                    </button>
                  </span>
                </div>
                <div className="cart__side">
                  <button className="cart__remove" type="button" aria-label={`Remove ${l.p.name} from the bag`} onClick={() => setQty(l.slug, l.size, 0)}>
                    <TrashIcon size={16} aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="cart__empty">
            <p>Your bag is empty.</p>
            <a className="link" href="/shop/">Browse all pieces</a>
          </div>
        )}

        {lines.length > 0 && (
          <footer className="cart__foot">
            <p className="t-small muted">We confirm the prices and the delivery cost with you on WhatsApp before you pay.</p>
            <a className="btn btn--buy" href="/checkout/">Checkout</a>
            <a className="link cart__all" href="/bag/">View the bag</a>
          </footer>
        )}
      </div>
    </dialog>
  );
}
