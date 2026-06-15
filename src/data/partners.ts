export interface Partner {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export const partners: Partner[] = [
  {
    id: "dext",
    name: "DEXT",
    logo: "/images/partners/dext.jpg",
    color: "#1a1a1a",
  },
  {
    id: "honda",
    name: "Honda Racing",
    logo: "/images/partners/honda.webp",
    color: "#cc0000",
  },
  {
    id: "motul",
    name: "Motul",
    logo: "/images/partners/motul.svg",
    color: "#ed252f",
  },
  {
    id: "dakar",
    name: "Dakar Rally",
    logo: "/images/partners/dakar.png",
    color: "#f48220",
  },
  {
    id: "wrc",
    name: "WRC",
    logo: "/images/partners/wrc.png",
    color: "#e2001a",
  },
  {
    id: "lemans",
    name: "24H Le Mans",
    logo: "/images/partners/lemans.png",
    color: "#003da5",
  },
];
