import type { Metadata } from "next";
import ShopChrome from "@/components/ShopChrome";
import { allPhotoIds } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Photograph credits: Avia Samara",
  description: "The source of every photograph on this site.",
};

export default function Credits() {
  return (
    <ShopChrome>
      <div className="prose">
        <h1 className="t-h2">Photograph credits</h1>
        <p>The photographs on this site come from Pexels and are used under the Pexels License. Each links to its page, which names the photographer.</p>
        <ul>
          {allPhotoIds.map((id) => (
            <li key={id}>
              <a className="link" href={`https://www.pexels.com/photo/${id}/`} rel="noopener">Pexels photograph {id}</a>
            </li>
          ))}
        </ul>
      </div>
    </ShopChrome>
  );
}
