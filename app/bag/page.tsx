import type { Metadata } from "next";
import ShopChrome from "@/components/ShopChrome";
import { BagView } from "@/components/BagView";

export const metadata: Metadata = {
  title: "Your bag: Avia Samara",
  description: "The Avia Samara pieces in your bag, with quantities and the subtotal.",
};

export default function Bag() {
  return (
    <ShopChrome>
      <header className="pg__head">
        <h1>Your bag</h1>
      </header>
      <BagView />
    </ShopChrome>
  );
}
