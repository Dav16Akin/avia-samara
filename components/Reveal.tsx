"use client";

import { useEffect } from "react";

/* Pictures and cards rise into place as they come on screen: anything marked [data-reveal] gets .is-in
   once a fifth of it is in view, one after another in a row (--i). html.rv turns the hidden starting
   state on, so without this script (or under reduced motion) everything simply shows. */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    // whatever is already on screen when the page opens shows at once (no flash of empty boxes)
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add("is-in");
    });
    html.classList.add("rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );
    els.filter((el) => !el.classList.contains("is-in")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
