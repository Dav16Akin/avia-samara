"use client";

import type { FormEvent, ReactNode } from "react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { whatsappUrl } from "@/lib/contact";
import { useLines } from "@/components/BagView";

// No payment provider yet: a checked form opens WhatsApp with the order already written,
// and the customer sends it to the business from there.
// The kit's form script (system.js) checks the fields first; it runs on the form itself,
// before React's handler, and cancels the submit when a field needs fixing.
function send(e: FormEvent<HTMLFormElement>, write: (f: FormData) => string) {
  const form = e.currentTarget;
  if (e.defaultPrevented) return;
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const url = whatsappUrl(write(new FormData(form)));
  const tab = window.open(url, "_blank");
  if (tab) tab.opener = null;
  else window.location.href = url;
  const status = form.querySelector("[data-form-status]");
  if (status) status.textContent = form.dataset.sent ?? "";
}

const val = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const lines = (rows: [string, string][]) => rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");

const Field = ({ id, label, error, full, children }: { id: string; label: string; error?: string; full?: boolean; children: ReactNode }) => (
  <div className={full ? "field field--full" : "field"}>
    <label htmlFor={id}>{label}</label>
    {children}
    {error && <p className="field__error" id={`${id}-err`} hidden>{error}</p>}
  </div>
);

const SendButton = ({ children, disabled }: { children: ReactNode; disabled?: boolean }) => (
  <div className="btn-row">
    <button className="btn btn--buy" type="submit" disabled={disabled}>
      <WhatsappLogoIcon size={20} aria-hidden="true" />
      {children}
    </button>
  </div>
);

export function CheckoutForm() {
  const { lines: bag } = useLines();
  const empty = bag.length === 0;

  const write = (f: FormData) =>
    [
      "Hello Avia Samara, I would like to order:",
      "",
      ...bag.map((l) => `• ${l.qty} × ${l.p.name}${l.size === "fitted" ? " (fitted to me)" : `, size ${l.size}`}`),
      "",
      lines([
        ["Name", val(f, "name")],
        ["Phone", val(f, "phone")],
        ["Delivery address", [val(f, "address"), val(f, "city")].filter(Boolean).join(", ")],
        ["Note", val(f, "notes")],
      ]),
      "",
      "Please confirm the price, the delivery cost and how to pay.",
    ].join("\n");

  return (
    <form
      className="form span-7"
      onSubmit={(e) => send(e, write)}
      data-sent="WhatsApp is open with your order. Press send there and we reply with the prices and delivery."
      noValidate
    >
      <Field id="c-name" label="Full name" error="Write the name the order is for.">
        <input id="c-name" name="name" type="text" autoComplete="name" required aria-describedby="c-name-err" />
      </Field>
      <Field id="c-phone" label="Phone" error="Write the phone number the courier can call.">
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required aria-describedby="c-phone-err" />
      </Field>
      <Field id="c-city" label="City" error="Write the city we deliver to.">
        <input id="c-city" name="city" type="text" autoComplete="address-level2" required aria-describedby="c-city-err" />
      </Field>
      <Field id="c-address" label="Delivery address" error="Write the street address we deliver to.">
        <input id="c-address" name="address" type="text" autoComplete="street-address" required aria-describedby="c-address-err" />
      </Field>
      <Field id="c-notes" label="Note (optional)" full>
        <textarea id="c-notes" name="notes" rows={3}></textarea>
      </Field>
      <SendButton disabled={empty}>Send order on WhatsApp</SendButton>
      <p className="form__status" role="status" data-form-status>
        {empty ? "Your bag is empty. Add a piece before you send an order." : ""}
      </p>
    </form>
  );
}

export function FittingForm() {
  const write = (f: FormData) =>
    [
      "Hello Avia Samara, I would like to book a Samara Bespoke fitting.",
      "",
      lines([
        ["Name", val(f, "name")],
        ["Phone", val(f, "phone")],
        ["Piece", val(f, "piece")],
        ["Needed by", val(f, "date")],
        ["Fitting at", val(f, "store")],
        ["Occasion and notes", val(f, "notes")],
      ]),
    ].join("\n");

  return (
    <form
      className="form span-7"
      onSubmit={(e) => send(e, write)}
      data-sent="WhatsApp is open with your request. Press send there and we reply to arrange the fitting."
      noValidate
    >
      <Field id="b-name" label="Full name" error="Write the name the fitting is for.">
        <input id="b-name" name="name" type="text" autoComplete="name" required aria-describedby="b-name-err" />
      </Field>
      <Field id="b-phone" label="Phone" error="Write a phone number we can reach you on.">
        <input id="b-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required aria-describedby="b-phone-err" />
      </Field>
      <Field id="b-piece" label="Piece">
        <select id="b-piece" name="piece" defaultValue="Two-piece suit">
          <option>Two-piece suit</option>
          <option>Three-piece suit</option>
          <option>Tailored jacket</option>
          <option>Formalwear for an event</option>
        </select>
      </Field>
      <Field id="b-store" label="Where">
        <select id="b-store" name="store" defaultValue="Lagos store (Lekki)">
          <option>Lagos store (Lekki)</option>
          <option>Benin City store (GRA)</option>
          <option>By video call</option>
        </select>
      </Field>
      <Field id="b-date" label="Date you need it by" error="Write the day you need the suit for." full>
        <input id="b-date" name="date" type="text" autoComplete="off" required aria-describedby="b-date-err" />
      </Field>
      <Field id="b-notes" label="Occasion and notes" full>
        <textarea id="b-notes" name="notes" rows={4}></textarea>
      </Field>
      <SendButton>Request on WhatsApp</SendButton>
      <p className="form__status" role="status" data-form-status></p>
    </form>
  );
}
