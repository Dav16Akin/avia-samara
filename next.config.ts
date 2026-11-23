import type { NextConfig } from "next";

// A static export: every route is an HTML file in `out/`, so the site can be
// hosted anywhere and checked by the tasteskill gate. Remove `output` when the
// shop gets a server (payments, stock, accounts).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
