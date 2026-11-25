"use client";

import { useEffect, useRef } from "react";
import Pic from "@/components/Pic";
import type { Product } from "@/lib/catalog";

type Look = Pick<Product, "slug" | "name" | "photos">;

/* The lookbook: every look from the shoot on one rail. On a wide screen the section pins under the
   header and the page's scroll walks the rail sideways (a blue line counts the way), each photograph
   drifting a little against its frame; the second view of a look fades in under the pointer. On a
   phone, a tablet or under reduced motion it is a plain row the visitor swipes. */
export default function Lookbook({ looks }: { looks: Look[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    const wide = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let travel = 0;
    let frame = 0;
    const items = [...tr.querySelectorAll<HTMLElement>(".look")];
    const pics = items.map((it) => it.querySelector<HTMLElement>(".look__media img"));

    const measure = () => {
      if (!wide.matches) {
        sec.classList.remove("is-pinned");
        sec.style.height = "";
        tr.style.transform = "";
        pics.forEach((p) => p && (p.style.transform = ""));
        return;
      }
      sec.classList.add("is-pinned");
      travel = Math.max(0, tr.scrollWidth - tr.clientWidth);
      // the section is as tall as the rail is long: one screen to arrive, then the travel
      sec.style.height = `${window.innerHeight + travel}px`;
      update();
    };
    const update = () => {
      frame = 0;
      if (!wide.matches) return;
      const r = sec.getBoundingClientRect();
      const span = sec.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      tr.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const mid = window.innerWidth / 2;
      items.forEach((it, i) => {
        const b = it.getBoundingClientRect();
        const off = (b.left + b.width / 2 - mid) / window.innerWidth;
        const img = pics[i];
        if (img) img.style.transform = `translate3d(${off * -6}%, 0, 0) scale(1.12)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // a key press that lands on a look off screen scrolls the page until the look is in view
    const onFocus = (e: FocusEvent) => {
      if (!wide.matches) return;
      const look = (e.target as Element).closest<HTMLElement>(".look");
      if (!look || travel <= 0) return;
      const want = Math.min(1, Math.max(0, (look.offsetLeft - tr.clientWidth / 2 + look.offsetWidth / 2) / travel));
      const top = sec.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + want * (sec.offsetHeight - window.innerHeight), behavior: "instant" as ScrollBehavior });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    wide.addEventListener("change", measure);
    tr.addEventListener("focusin", onFocus);
    // pictures arriving late can change the rail's length
    const ro = new ResizeObserver(() => measure());
    ro.observe(tr);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
      tr.removeEventListener("focusin", onFocus);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="lookbook" id="lookbook" ref={section} aria-labelledby="lookbook-h">
      <div className="lookbook__pin">
        <div className="wrap lookbook__head">
          <div>
            <p className="eyebrow">The new shoot</p>
            <h2 id="lookbook-h">The lookbook</h2>
          </div>
          <p className="lookbook__lede">
            Eight looks from the new Avia Samara shoot, from grand agbadas to embroidered denim. Every piece is fitted to you.
          </p>
          <span className="lookbook__progress" aria-hidden="true">
            <span ref={bar} />
          </span>
        </div>
        <div className="lookbook__rail">
          <div className="lookbook__track" ref={track}>
            {looks.map((l, i) => {
              const [main, alt] = l.photos;
              return (
                <a className="look" href={`/products/${l.slug}/`} key={l.slug}>
                  <span className={`look__media${alt ? " has-alt" : ""}`}>
                    <Pic name={main.name} alt={main.alt} sizes="(max-width: 1023px) 70vw, 460px" style={{ objectPosition: main.focus }} data-subject="product" />
                    {alt && <Pic className="look__alt" name={alt.name} alt="" sizes="(max-width: 1023px) 70vw, 460px" style={{ objectPosition: alt.focus }} />}
                  </span>
                  <span className="look__cap">
                    <span className="look__no">{String(i + 1).padStart(2, "0")}</span>
                    <span className="look__name">{l.name}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
