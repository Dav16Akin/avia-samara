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

  // back to the home page through the logo or a home link (from any other page): the opening screen
  // plays again on arrival (layout.tsx reads the flag before the first paint)
  useEffect(() => {
    if (window.location.pathname === "/") return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || a.getAttribute("target") === "_blank") return;
      const url = new URL((a as HTMLAnchorElement).href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/" || url.hash) return;
      try {
        sessionStorage.setItem("as-splash-home", "1");
      } catch {}
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const paint = () =>
      document.querySelectorAll("[data-bag-count]").forEach((el) => {
        el.textContent = String(count);
        el.toggleAttribute("hidden", count === 0);
      });
    paint();
    const t = window.setTimeout(paint, 1200);
    return () => window.clearTimeout(t);
  }, [count]);

  return null;
}
