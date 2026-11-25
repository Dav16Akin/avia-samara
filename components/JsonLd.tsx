// Structured data for search engines, as the Next.js guide has it: a script tag in the page, with "<"
// escaped so no string in the data can close the tag.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
