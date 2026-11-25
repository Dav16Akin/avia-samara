import type { Metadata } from "next";
import ShopChrome from "@/components/ShopChrome";
import { CheckoutSummary } from "@/components/BagView";
import { CheckoutForm } from "@/components/WhatsAppForms";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: true },
  alternates: { canonical: "/checkout/" },
  description: "Send your Avia Samara order on WhatsApp with your delivery details.",
};

// No payment provider yet: the order goes to the business on WhatsApp (components/WhatsAppForms.tsx).
export default function Checkout() {
  return (
    <ShopChrome>
      <header className="pg__head">
        <h1>Checkout</h1>
        <p>Add your delivery details and send the order to us on WhatsApp. We confirm the prices, the delivery cost and how to pay before anything is charged.</p>
      </header>
      <div className="grid bag">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    </ShopChrome>
  );
}
