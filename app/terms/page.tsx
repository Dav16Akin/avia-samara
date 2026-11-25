import type { Metadata } from "next";
import ShopChrome from "@/components/ShopChrome";
import { phone, whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Terms of sale",
  alternates: { canonical: "/terms/" },
  description: "How ordering from Avia Samara works.",
};

export default function Terms() {
  return (
    <ShopChrome>
      <div className="prose">
        <h1 className="t-h2">Terms</h1>
        <h2>Orders</h2>
        <p>Orders are sent to us on WhatsApp. An order is confirmed once we have replied with the price and the delivery cost and you have paid. Prices are in Nigerian naira.</p>
        <h2>Samara Bespoke</h2>
        <p>Bespoke pieces are made to your measurements after a fitting. We agree the cloth and the price with you before we cut.</p>
        <h2>Questions</h2>
        <p>
          For anything about an order, message us on{" "}
          <a className="link" href={whatsappUrl("Hello Avia Samara, I have a question about an order.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
          or call <a className="link" href={`tel:${phone.tel}`}>{phone.display}</a>.
        </p>
      </div>
    </ShopChrome>
  );
}
