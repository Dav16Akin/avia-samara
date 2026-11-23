import type { Metadata } from "next";
import ShopChrome from "@/components/ShopChrome";

export const metadata: Metadata = {
  title: "Privacy: Avia Samara",
  description: "What this site stores about you and why.",
};

export default function Privacy() {
  return (
    <ShopChrome>
      <div className="prose">
        <h1 className="t-h2">Privacy</h1>
        <h2>Your bag</h2>
        <p>The pieces in your bag are kept in your own browser so they are still there when you come back. Clearing your browser data removes them.</p>
        <h2>Orders and fittings</h2>
        <p>When you send an order or a fitting request, we use the name, contact details and address you give only to fulfil it and to reply to you.</p>
        <h2>Newsletter</h2>
        <p>If you subscribe, we use your email address to send news of new pieces. You can ask us to stop at any time.</p>
      </div>
    </ShopChrome>
  );
}
