"use client";

import { useEffect } from "react";
import { useBag, countOf } from "@/lib/bag";

// Loads the tasteskill kit's scripts once React has hydrated, so the kit never
// changes the DOM under hydration. Pages are full loads (plain <a> links), so
// the kit starts fresh on each one. Also keeps every bag counter on the page in
// step with the bag, including the copy the kit makes for the phone menu.
const SCRIPTS = ["/assets/system.js", "/assets/motion/motion.js", "/assets/layout/layout.js"];

export default function KitScripts() {
  const count = countOf(useBag());

  useEffect(() => {
    // while the opening screen shows, wait for it to lift (layout.tsx sets window.__splash), so the
    // hero's entrance plays as the curtain rises instead of under it
    const splash = (window as Window & { __splash?: Promise<void> }).__splash ?? Promise.resolve();
    splash.then(() => {
      for (const src of SCRIPTS) {
        if (document.querySelector(`script[data-kit="${src}"]`)) continue;
        const s = document.createElement("script");
        s.type = "module";
        s.src = src;
        s.dataset.kit = src;
        document.body.appendChild(s);
      }
    });
  }, []);

  useEffect(() => {
    const paint = () =>
      document.querySelectorAll("[data-bag-count]").forEach((el) => {
        el.textContent = String(count);
      });
    paint();
    const t = window.setTimeout(paint, 1200);
    return () => window.clearTimeout(t);
  }, [count]);

  return null;
}
