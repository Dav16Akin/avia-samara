"use client";

import { useEffect, useRef } from "react";

/* The hero's film, full bleed. The client's film is portrait (shot for a phone), so:
   - a landscape screen plays hero-wide: three portrait columns of different shots side by side in one
     1440x856 file (scripts/encode-triptych.swift), about 1.8 MB in HEVC, 2.6 MB in H.264;
   - a portrait screen (a phone) plays hero-loop, the single portrait cut, about 1 to 1.6 MB.
   Each column is cut from shots with the subtitles cropped off. The poster is the video's CSS
   background, picked by the screen's shape, and stays when the film cannot play (reduced motion,
   data saver, iOS low power mode). The video gets its sources from here, so those visitors never
   download it. */
const WIDE = "(min-aspect-ratio: 1/1)";

export function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    const name = window.matchMedia(WIDE).matches ? "hero-wide" : "hero-loop";
    v.innerHTML =
      `<source src="/media/video/${name}-hevc.mp4" type='video/mp4; codecs="hvc1"'>` +
      `<source src="/media/video/${name}.mp4" type="video/mp4">`;
    v.load();
    v.play().catch(() => {});
    // stop decoding while the hero is off screen
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* its poster is a CSS background (site.css): the landscape still on a wide screen, the portrait one on a phone */}
      <video ref={ref} className="stage__layer film__video" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} data-enter-media="" />
    </>
  );
}

/* "Watch the film": the whole 1:56 welcome from the founders, with sound, loaded only on the click. */
export function FilmButton({ compact = false }: { compact?: boolean }) {
  const open = () => {
    // the dialog's own id (film-dialog): the store-film section must never share it, or the button finds
    // the section instead and nothing plays
    const d = document.getElementById("film-dialog") as HTMLDialogElement | null;
    const v = d?.querySelector("video");
    if (!d || !v) return;
    // one sound at a time: the store film on the page pauses while the full film plays
    document.querySelectorAll<HTMLVideoElement>(".filmband video").forEach((x) => x.pause());
    v.volume = 0.6;
    if (!v.querySelector("source")) {
      v.innerHTML =
        '<source src="/media/video/film-hevc.mp4" type=\'video/mp4; codecs="hvc1"\'>' +
        '<source src="/media/video/film.mp4" type="video/mp4">';
      v.load();
    }
    d.showModal();
    v.play().catch(() => {});
  };
  return (
    <button className={compact ? "film-btn film-btn--on-film" : "film-btn"} type="button" onClick={open} aria-haspopup="dialog">
      <span className="film-btn__disc" aria-hidden="true">
        <svg viewBox="0 0 18 18"><path d="M5 3.2v11.6c0 .7.8 1.2 1.4.8l9.2-5.8c.6-.4.6-1.2 0-1.6L6.4 2.4C5.8 2 5 2.5 5 3.2Z" fill="currentColor" /></svg>
      </span>
      <span className="film-btn__label">
        Watch the store film
        {!compact && <small>The founders welcome you, 1:56</small>}
      </span>
    </button>
  );
}

export function FilmDialog() {
  const close = (e: React.SyntheticEvent<HTMLDialogElement>) => e.currentTarget.querySelector("video")?.pause();
  return (
    <dialog id="film-dialog" className="film-dialog" aria-label="The Avia Samara store film" onClose={close}
      onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}>
      <video controls playsInline preload="none" poster="/media/video/film-poster.webp" />
      <form method="dialog">
        <button className="film-dialog__close" type="submit" aria-label="Close the film">
          <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </form>
    </dialog>
  );
}
