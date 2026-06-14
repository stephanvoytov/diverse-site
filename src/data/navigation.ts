export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Главная", href: "/" },
  { label: "О бренде", href: "/about/" },
  { label: "Франшиза", href: "/franchise/" },
  { label: "Коллекции", href: "/collection/" },
  { label: "Магазины", href: "/stores/" },
];
