"use client";

import { useEffect, useRef, useState } from "react";
import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";
import { FilmButton } from "@/components/HeroFilm";

// how loud the store film plays: a quarter of full volume, there but never overwhelming
const VOLUME = 0.25;

/* The store film (the client's 36 s TV cut, 1280x720, with its sound) in a frame that opens to the full
   width of the screen as the visitor scrolls into it, the words rising on its blurred left side.

   It plays by itself once on screen and pauses off screen. Sound: browsers only allow it after the
   visitor has tapped, clicked or pressed a key on the page, so the film first tries to start with sound
   (allowed when the visitor already has), else starts silent and takes the sound on the first tap or
   click while it is on screen. A button on the film turns the sound on and off. The level is set through
   Web Audio, since an iPhone ignores a video's own volume. Under reduced motion or data saver it never
   starts by itself: the poster stays until the sound button is pressed. */
export default function FilmBand() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const audio = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);
  const [muted, setMuted] = useState(true);
  const loaded = useRef(false);
  const onScreen = useRef(false);
  const userMuted = useRef(false);

  const load = () => {
    const v = video.current;
    if (!v || loaded.current) return;
    v.innerHTML = '<source src="/media/video/store-tv.mp4" type="video/mp4">';
    v.load();
    loaded.current = true;
  };

  // the quiet level, through a gain node where the browser has Web Audio (made on a user gesture)
  const quiet = () => {
    const v = video.current;
    if (!v) return;
    try {
      if (!audio.current) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AC();
        const gain = ctx.createGain();
        gain.gain.value = VOLUME;
        ctx.createMediaElementSource(v).connect(gain).connect(ctx.destination);
        audio.current = { ctx, gain };
        v.volume = 1;
      }
      audio.current.ctx.resume().catch(() => {});
    } catch {
      v.volume = VOLUME; // no Web Audio: the element's own volume (desktop browsers honour it)
    }
  };

  const soundOn = () => {
    const v = video.current;
    if (!v) return;
    load();
    quiet();
    v.muted = false;
    setMuted(false);
    v.play().catch(() => {});
  };

  const soundOff = () => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    setMuted(true);
  };

  const toggle = () => {
    if (muted) {
      userMuted.current = false;
      soundOn();
    } else {
      userMuted.current = true;
      soundOff();
    }
  };

  useEffect(() => {
    const sec = section.current;
    const v = video.current;
    if (!sec || !v) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData;
    const wide = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

    // try sound first; a browser that refuses it gets the film silent, and the sound waits for a gesture
    const start = () => {
      load();
      if (!userMuted.current && navigator.userActivation?.hasBeenActive) {
        quiet();
        v.muted = false;
      } else v.muted = true;
      setMuted(v.muted);
      v.play().catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    };

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen.current = e.isIntersecting;
        if (e.isIntersecting) {
          if (!still || !v.paused || loaded.current) start();
        } else if (loaded.current) v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(sec);

    // the first tap, click or key while the film is on screen brings its sound in
    const onGesture = (e: Event) => {
      if (!onScreen.current || userMuted.current || !v.muted) return;
      if ((e.target as Element | null)?.closest?.(".filmband__sound")) return; // the button handles itself
      if (still && v.paused) return;
      soundOn();
    };
    window.addEventListener("pointerdown", onGesture, true);
    window.addEventListener("keydown", onGesture, true);

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
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("keydown", onGesture, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="filmband ground-inverse" id="store-film" ref={section} aria-labelledby="film-h">
      <div className="filmband__pin">
        <div className="filmband__frame">
          <video ref={video} muted loop playsInline preload="none" tabIndex={-1} poster="/media/video/store-tv-poster.webp" aria-label="The Avia Samara store film" />
          <button className="filmband__sound" type="button" onClick={toggle} aria-pressed={!muted} aria-label={muted ? "Turn the film's sound on" : "Turn the film's sound off"}>
            {muted ? <SpeakerSlashIcon size={20} aria-hidden="true" /> : <SpeakerHighIcon size={20} aria-hidden="true" />}
            <span>{muted ? "Sound on" : "Sound off"}</span>
          </button>
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
