// The image pipeline. Drop originals into media-src/images (JPEG, PNG or HEIC, any size) and run
//
//   npm run images
//
// Every image becomes WebP at 320, 640, 1280 and 1920 px wide (never wider than its original) plus
// one JPEG fallback at 640, with metadata stripped, in public/media/img/. Sizes go to
// lib/media.json, which <Pic> reads so every <img> carries its real width and height (no layout
// shift). Uses the macOS tools sips and cwebp (brew install webp). Unchanged files are skipped.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

const SRC = "media-src/images";
const OUT = "public/media/img";
const MANIFEST = "lib/media.json";
const WIDTHS = [320, 640, 1280, 1920];
const QUALITY = "74";

mkdirSync(OUT, { recursive: true });
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
const tmp = join(OUT, ".tmp.png");

const dims = (file) => {
  const o = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file]).toString();
  return [Number(o.match(/pixelWidth: (\d+)/)[1]), Number(o.match(/pixelHeight: (\d+)/)[1])];
};

let made = 0;
for (const f of readdirSync(SRC).sort()) {
  if (!/\.(jpe?g|png|heic)$/i.test(f)) continue;
  const name = basename(f, extname(f)).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const src = join(SRC, f);
  const mtime = statSync(src).mtimeMs;
  if (manifest[name]?.mtime === mtime && existsSync(join(OUT, `${name}-640.jpg`))) continue;

  const [w, h] = dims(src);
  const widths = WIDTHS.filter((x) => x <= w);
  if (!widths.includes(w) && w < WIDTHS[WIDTHS.length - 1]) widths.push(w); // the original's own width as the top size
  for (const x of widths) {
    execFileSync("sips", ["-s", "format", "png", "--resampleWidth", String(x), src, "--out", tmp], { stdio: "ignore" });
    execFileSync("cwebp", ["-quiet", "-q", QUALITY, "-m", "6", "-af", "-sharp_yuv", "-metadata", "none", tmp, "-o", join(OUT, `${name}-${x}.webp`)]);
  }
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "72", "--resampleWidth", String(Math.min(640, w)), src, "--out", join(OUT, `${name}-640.jpg`)], { stdio: "ignore" });
  manifest[name] = { w, h, widths, mtime };
  made++;
  console.log(`${name}  ${w}x${h}  ->  ${widths.join(", ")}`);
}
execFileSync("rm", ["-f", tmp]);
writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2) + "\n");
console.log(`${made} image(s) processed, ${Object.keys(manifest).length} in ${MANIFEST}`);
