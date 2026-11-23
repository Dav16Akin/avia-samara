import type { Metadata } from "next";
import ShopChrome from "@/components/ShopChrome";
import ProductTile from "@/components/ProductTile";
import { productsIn, collectionOf } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Book a fitting: Samara Bespoke",
  description: "Request a fitting for a Samara Bespoke suit, tailored jacket or three-piece suit made to your measurements.",
};

export default function Bespoke() {
  const c = collectionOf("bespoke");
  return (
    <ShopChrome current="bespoke">
      <header className="pg__head">
        <span className="pg__no">Collection {c.no}</span>
        <h1>Book a Samara Bespoke fitting</h1>
        <p>{c.line} Tell us what you need and when, and we reply to arrange the fitting.</p>
      </header>
      <div className="grid bag">
        <form
          className="form span-7"
          action="mailto:bespoke@aviasamara.example"
          method="post"
          encType="text/plain"
          data-endpoint=""
          data-sent="Your fitting request is in. We reply to arrange it."
          noValidate
        >
          <div className="field">
            <label htmlFor="b-name">Full name</label>
            <input id="b-name" name="name" type="text" autoComplete="name" required aria-describedby="b-name-err" />
            <p className="field__error" id="b-name-err" hidden>Write the name the fitting is for.</p>
          </div>
          <div className="field">
            <label htmlFor="b-email">Email</label>
            <input id="b-email" name="email" type="email" autoComplete="email" inputMode="email" required aria-describedby="b-email-err" />
            <p className="field__error" id="b-email-err" hidden>Write an email address with an @, like name@example.com.</p>
          </div>
          <div className="field">
            <label htmlFor="b-piece">Piece</label>
            <select id="b-piece" name="piece" defaultValue="Two-piece suit">
              <option>Two-piece suit</option>
              <option>Three-piece suit</option>
              <option>Tailored jacket</option>
              <option>Formalwear for an event</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="b-date">Date you need it by</label>
            <input id="b-date" name="date" type="text" autoComplete="off" required aria-describedby="b-date-err" />
            <p className="field__error" id="b-date-err" hidden>Write the day you need the suit for.</p>
          </div>
          <div className="field field--full">
            <label htmlFor="b-notes">Occasion and notes</label>
            <textarea id="b-notes" name="notes" rows={4}></textarea>
          </div>
          <div className="btn-row">
            <button className="btn btn--primary" type="submit">Request a fitting</button>
          </div>
          <p className="form__status" role="status" data-form-status></p>
        </form>
      </div>
      <section className="pdp__more" aria-labelledby="bs-h">
        <h2 id="bs-h">Suits from Samara Bespoke</h2>
        <div className="grid">
          {productsIn("bespoke").map((p) => (
            <ProductTile p={p} key={p.slug} />
          ))}
        </div>
      </section>
    </ShopChrome>
  );
}
