import { MONOGRAM_BOX, MONOGRAM_PATH } from "@/lib/monogram";

/* The client's logo, rebuilt so it stays sharp at any size: the AS monogram is the traced
   artwork (lib/monogram.ts) and the lettering is live text in the logo's own faces, Montserrat for
   AVIA-SAMARA (running through the middle of the monogram, as on the logo) and Cinzel for the
   tagline, laid where the logo has them. */

export function Monogram({ className, tight = true }: { className?: string; tight?: boolean }) {
  return (
    <svg className={className} viewBox={tight ? MONOGRAM_BOX : "0 0 1000 1000"} aria-hidden="true" focusable="false">
      <path fill="currentColor" fillRule="evenodd" d={MONOGRAM_PATH} />
    </svg>
  );
}

/* The nav's logo: the monogram with AVIA-SAMARA through its middle. At nav height the logo's own
   proportion would set the word 4px tall, so the word is drawn a little larger (optical size) and
   runs on past the monogram's right side. */
export function Lockup() {
  return (
    <span className="lockup__logo">
      <Monogram className="lockup__mark" />
      <span className="lockup__word">Avia-Samara</span>
    </span>
  );
}

/* The whole logo as the client draws it: monogram, wordmark and "Men's Boutique & Luxury Store". */
export function FullLogo({ className }: { className?: string }) {
  return (
    <span className={`logo-full${className ? ` ${className}` : ""}`}>
      <Monogram className="logo-full__mark" tight={false} />
      <span className="logo-full__word">Avia-Samara</span>
      <span className="logo-full__tag">
        Men&rsquo;s Boutique &amp;
        <br />
        Luxury Store
      </span>
    </span>
  );
}

/* The opening screen. It is in the server HTML, so it is the first thing painted; a head script
   (layout.tsx) shows it once per browser session and the CSS in site.css runs it and lifts it
   away by itself, about 2.4 s in all, so nothing waits on a script or on the film. */
export function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <FullLogo className="splash__logo" />
    </div>
  );
}
