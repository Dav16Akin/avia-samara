// The business's contact details, in one place: the footer, checkout and fittings read them here.

export const phone = {
  display: "0707 000 0740",
  tel: "+2347070000740",
  // WhatsApp wants the international number, digits only
  whatsapp: "2347070000740",
};

export const stores = [
  { city: "Lagos", lines: ["House 19C, Road 4", "Lekki County, Lekki", "Lagos"] },
  { city: "Benin City", lines: ["32b Jemide Street", "Off Giwa-Amu Road, GRA", "Benin City, Edo"] },
] as const;

export const whatsappUrl = (text: string) => `https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(text)}`;
