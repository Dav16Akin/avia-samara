"use client";

// The shopping bag: a small store kept in localStorage, so it survives page loads
// on the static export. Swap for a server cart when the backend arrives.

import { useSyncExternalStore } from "react";

export type BagLine = { slug: string; size: string; qty: number };
// every piece is fitted to its wearer; the line keeps a size field for orders made before that
export const FITTED = "fitted";

const KEY = "avia-samara-bag";
const EVENT = "avia-bag";
const EMPTY: BagLine[] = [];

let cache: BagLine[] = EMPTY;
let cacheRaw: string | null = null;

function read(): BagLine[] {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cache;
  }
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(lines: BagLine[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    cacheRaw = JSON.stringify(lines);
    cache = lines;
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useBag() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function addToBag(slug: string, size: string) {
  const lines = read().map((l) => ({ ...l }));
  const hit = lines.find((l) => l.slug === slug && l.size === size);
  if (hit) hit.qty += 1;
  else lines.push({ slug, size, qty: 1 });
  write(lines);
}

export function setQty(slug: string, size: string, qty: number) {
  const lines = read()
    .map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l))
    .filter((l) => l.qty > 0);
  write(lines);
}

export function clearBag() {
  write([]);
}

export const countOf = (lines: BagLine[]) => lines.reduce((n, l) => n + l.qty, 0);
