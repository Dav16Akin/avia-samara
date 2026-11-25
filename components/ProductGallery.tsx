"use client";

import { useEffect, useRef, useState } from "react";
import Pic from "@/components/Pic";
import type { Photo } from "@/lib/catalog";

/* A piece's photographs. On a wide screen the other views stand in a column of thumbnails left of the
   main picture: a click (or a hover) puts one in the main frame. On a phone the views are one row the
   visitor swipes, with a count under it. */
export default function ProductGallery({ photos }: { photos: Photo[] }) {
  const [i, setI] = useState(0);
  const row = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  // the phone row: the count follows the swipe
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const onScroll = () => setShown(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const many = photos.length > 1;
  return (
    <div className={`gallery-pdp${many ? "" : " gallery-pdp--one"}`}>
      {many && (
        <div className="gallery-pdp__thumbs" role="group" aria-label="Views of this piece">
          {photos.map((ph, k) => (
            <button
              type="button"
              key={ph.name}
              className="gallery-pdp__thumb"
              aria-label={`View ${k + 1} of ${photos.length}: ${ph.alt}`}
              aria-pressed={k === i}
              onClick={() => setI(k)}
              onMouseEnter={() => setI(k)}
            >
              <Pic name={ph.name} alt="" sizes="88px" style={{ objectPosition: ph.focus }} />
            </button>
          ))}
        </div>
      )}
      <div className="gallery-pdp__main">
        {photos.map((ph, k) => (
          <Pic
            key={ph.name}
            name={ph.name}
            alt={ph.alt}
            className={k === i ? "is-on" : undefined}
            sizes="(max-width: 1023px) 100vw, 600px"
            priority={k === 0}
            style={{ objectPosition: ph.focus }}
            data-subject="product"
          />
        ))}
      </div>
      {/* the phone's swipe row */}
      <div className="gallery-pdp__row" ref={row} aria-label="Views of this piece, swipe for more">
        {photos.map((ph) => (
          <Pic key={ph.name} name={ph.name} alt={ph.alt} sizes="100vw" style={{ objectPosition: ph.focus }} />
        ))}
      </div>
      {many && (
        <p className="gallery-pdp__count" aria-hidden="true">
          {shown + 1} / {photos.length}
        </p>
      )}
    </div>
  );
}
