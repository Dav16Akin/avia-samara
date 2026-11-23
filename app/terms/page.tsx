import type { Metadata } from "next";
import ShopChrome from "@/components/ShopChrome";

export const metadata: Metadata = {
  title: "Terms: Avia Samara",
  description: "How ordering from Avia Samara works.",
};

export default function Terms() {
  return (
    <ShopChrome>
      <div className="prose">
        <h1 className="t-h2">Terms</h1>
        <h2>Orders</h2>
        <p>An order is confirmed once we have replied with the delivery price and you have paid. Prices are in Nigerian naira.</p>
        <h2>Samara Bespoke</h2>
        <p>Bespoke pieces are made to your measurements after a fitting. The listed price is a starting price for the cloth shown.</p>
        <h2>Questions</h2>
        <p>
          For anything about an order, <a className="link" href="mailto:hello@aviasamara.example">email us</a>
        </p>
      </div>
    </ShopChrome>
  );
}
