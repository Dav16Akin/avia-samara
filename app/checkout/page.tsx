import type { Metadata } from "next";
import ShopChrome from "@/components/ShopChrome";
import { CheckoutSummary } from "@/components/BagView";

export const metadata: Metadata = {
  title: "Checkout: Avia Samara",
  description: "Send your Avia Samara order with your delivery details.",
};

// No payment provider is wired yet. Until the client's gateway and order endpoint
// exist, the form's action is a mailto stand-in on .example (see the build report):
// set data-endpoint to the real order endpoint and the kit's form script posts to it.
export default function Checkout() {
  return (
    <ShopChrome>
      <header className="pg__head">
        <h1>Checkout</h1>
        <p>Send your order with your delivery details. We confirm the delivery price before you pay.</p>
      </header>
      <div className="grid bag">
        <form
          id="checkout-form"
          className="form span-7"
          action="mailto:orders@aviasamara.example"
          method="post"
          encType="text/plain"
          data-endpoint=""
          data-sent="Your order is in. We reply with the delivery price."
          noValidate
        >
          <div className="field">
            <label htmlFor="c-name">Full name</label>
            <input id="c-name" name="name" type="text" autoComplete="name" required aria-describedby="c-name-err" />
            <p className="field__error" id="c-name-err" hidden>Write the name the order is for.</p>
          </div>
          <div className="field">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" name="email" type="email" autoComplete="email" inputMode="email" required aria-describedby="c-email-err" />
            <p className="field__error" id="c-email-err" hidden>Write an email address with an @, like name@example.com.</p>
          </div>
          <div className="field">
            <label htmlFor="c-phone">Phone</label>
            <input id="c-phone" name="phone" type="tel" autoComplete="tel" required aria-describedby="c-phone-err" />
            <p className="field__error" id="c-phone-err" hidden>Write the phone number the courier can call.</p>
          </div>
          <div className="field">
            <label htmlFor="c-city">City</label>
            <input id="c-city" name="city" type="text" autoComplete="address-level2" required aria-describedby="c-city-err" />
            <p className="field__error" id="c-city-err" hidden>Write the city we deliver to.</p>
          </div>
          <div className="field field--full">
            <label htmlFor="c-address">Delivery address</label>
            <input id="c-address" name="address" type="text" autoComplete="street-address" required aria-describedby="c-address-err" />
            <p className="field__error" id="c-address-err" hidden>Write the street address we deliver to.</p>
          </div>
          <div className="btn-row">
            <button className="btn btn--primary" type="submit">Send your order</button>
          </div>
          <p className="form__status" role="status" data-form-status></p>
        </form>
        <CheckoutSummary />
      </div>
    </ShopChrome>
  );
}
