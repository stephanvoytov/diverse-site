export interface Store {
  city: string;
  mall: string;
  address: string;
  coords: [number, number];
  country: string;
  photo: string;
}

export const stores: Store[] = [
  { city: "Калининград",  mall: "ТРЦ «Европа»",           address: "ул. Театральная, 30",           coords: [20.4522, 54.7104], country: "Россия",    photo: "/images/stores/kaliningrad.jpg" },
  { city: "Зеленоградск", mall: "ТД «Звёздное Небо»",     address: "Курортный проспект, 18",        coords: [20.4748, 54.9582], country: "Россия",    photo: "/images/stores/zelenogradsk.jpg" },
  { city: "Уфа",          mall: "ТЦ «Мега-Уфа»",          address: "ул. Рубежная, 174",             coords: [55.9721, 54.7388], country: "Россия",    photo: "/images/stores/ufa-mega.webp" },
  { city: "Уфа",          mall: "ТРЦ «Планета»",          address: "ул. Энтузиастов, 20",           coords: [56.0497, 54.7653], country: "Россия",    photo: "/images/stores/ufa-planeta.jpg" },
  { city: "Сургут",       mall: "ТРЦ «Сургут Сити Молл»", address: "Югорский тракт, 3",             coords: [73.3969, 61.254],  country: "Россия",    photo: "/images/stores/surgut.jpg" },
  { city: "Красноярск",   mall: "ТРЦ «Комсомолл»",        address: "ул. Белинского, 8",             coords: [92.8932, 56.0153], country: "Россия",    photo: "/images/stores/krasnoyarsk.jpg" },
  { city: "Симферополь",  mall: "ТРЦ «Центрум»",          address: "ул. Симферопольская, 6",        coords: [34.1003, 44.9482], country: "Россия",    photo: "/images/stores/simferopol.jpg" },
  { city: "Якутск",       mall: "ТЦ «ЦУМ»",               address: "ул. Курашова, 4",               coords: [129.6775, 62.0355],country: "Россия",    photo: "/images/stores/yakutsk.jpg" },
  { city: "Саратов",      mall: "ТЦ «МИР»",               address: "ул. Московская, 115",            coords: [46.0343, 51.5336], country: "Россия",    photo: "/images/stores/saratov.jpg" },
  { city: "Щучинск",      mall: "ТД «Акжелкен»",          address: "ул. Ауэзова, 77а",              coords: [70.2025, 52.9367], country: "Казахстан", photo: "/images/stores/shchuchinsk.jpg" },
  { city: "Алматы",       mall: "",                       address: "ул. Розыбакиева, 289, Блок 1",  coords: [76.8512, 43.222],  country: "Казахстан", photo: "/images/stores/almaty.jpg" },
];

export const citiesSummary = [
  { label: "городов России", count: "8" },
  { label: "города Казахстана", count: "2" },
  { label: "магазинов", count: "11" },
];
