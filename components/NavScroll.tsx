"use client";

import { useEffect } from "react";

/* The home page's header sits clear over the film and turns white (.is-solid) as soon as the page
   scrolls. CSS keeps it white while a menu is open or the pointer is in a menu. */
export default function NavScroll() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav--overlay");
    if (!nav) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      nav.classList.toggle("is-solid", window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
