"use client";

import { useEffect, useRef } from "react";
import { FilmButton } from "@/components/HeroFilm";

/* The store film (the client's 36 s TV cut, 1280x720, muted) in a frame that opens to the full width of
   the screen as the visitor scrolls into it, the words rising on its blurred left side. The film loads
   only once the band is near, and never under reduced motion or data saver (the poster stays). */
export default function FilmBand() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const sec = section.current;
    const v = video.current;
    if (!sec || !v) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData;
    const wide = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

    let loaded = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (still) return;
        if (e.isIntersecting) {
          if (!loaded) {
            v.innerHTML = '<source src="/media/video/store-tv.mp4" type="video/mp4">';
            v.load();
            loaded = true;
          }
          v.play().catch(() => {});
        } else if (loaded) v.pause();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(sec);

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!wide.matches) {
        sec.style.removeProperty("--open");
        return;
      }
      const r = sec.getBoundingClientRect();
      const span = sec.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
      // the frame opens over the first 60% of the way, then holds full bleed
      sec.style.setProperty("--open", Math.min(1, p / 0.6).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="filmband ground-inverse" id="film" ref={section} aria-labelledby="film-h">
      <div className="filmband__pin">
        <div className="filmband__frame">
          <video ref={video} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} poster="/media/video/store-tv-poster.webp" />
        </div>
        <div className="wrap filmband__copy">
          <p className="eyebrow">Lekki, Lagos</p>
          <h2 id="film-h">Step inside the store</h2>
          <p>The rails, the fitting booth and the founders&rsquo; welcome, in the house the brand was built in.</p>
          <FilmButton />
        </div>
      </div>
    </section>
  );
}
