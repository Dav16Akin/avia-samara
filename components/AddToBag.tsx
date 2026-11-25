"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon } from "@phosphor-icons/react";
import { addToBag, FITTED, openCart } from "@/lib/bag";

// Every Avia Samara piece is fitted to its wearer, so there is no size to pick: the piece goes in
// the bag and the measurements are taken at a fitting after the order.
export default function AddToBag({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="pdp__buy">
      <p className="t-small muted">Fitted to you: we take your measurements at our Lagos or Benin City store, or by video call, after you order.</p>
      <button className="btn btn--buy" type="button" onClick={() => { addToBag(slug, FITTED); setAdded(true); openCart(); }}>
        Add to bag
      </button>
      <p className="pdp__note" role="status">
        <AnimatePresence mode="wait">
          {added && (
            <motion.span key="added" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <CheckIcon size={16} weight="bold" aria-hidden="true" />
              It is in your bag.{" "}
              <a className="link" href="/bag/">
                View your bag
              </a>
            </motion.span>
          )}
        </AnimatePresence>
      </p>
    </div>
  );
}
