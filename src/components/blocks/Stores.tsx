"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import type { Store } from "@/data/stores";
import { stores, citiesSummary } from "@/data/stores";
import { asset } from "@/lib/path";

function popupHtml(s: Store): string {
  return `<div style="width:240px;font-family:Inter,sans-serif;line-height:1.5;border-radius:4px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.15);">
    <div style="width:100%;aspect-ratio:3/2;background:#f0f0f0;overflow:hidden;">
      <img src="${asset(s.photo)}" alt="${s.city}"
        style="width:100%;height:100%;object-fit:contain;display:block;background:#f0f0f0;"
        onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:700;color:#D12026;background:#f5f5f5;\\'>${s.city[0]}</div>'" />
    </div>
    <div style="padding:14px 14px 12px;background:#fff;">
      <div style="font-size:16px;font-weight:700;color:#1a1a1a;line-height:1.3;">${s.city}</div>
      ${s.mall ? `<div style="font-size:12px;font-weight:600;color:#D12026;margin-top:3px;">${s.mall.replace(/[«»]/g, "")}</div>` : ""}
      <div style="font-size:12px;color:#888;margin-top:4px;line-height:1.4;">${s.address}</div>
    </div>
  </div>`;
}

const ll = (c: [number, number]): [number, number] => [c[1], c[0]];

/** Перевод городов с английского на русский */
const cityRu: Record<string, string> = {
  "Moscow": "Москва",
  "Saint Petersburg": "Санкт-Петербург",
  "Nizhny Novgorod": "Нижний Новгород",
  "Rostov-on-Don": "Ростов-на-Дону",
  "Yekaterinburg": "Екатеринбург",
  "Novosibirsk": "Новосибирск",
  "Kazan": "Казань",
  "Chelyabinsk": "Челябинск",
  "Omsk": "Омск",
  "Samara": "Самара",
  "Ufa": "Уфа",
  "Krasnoyarsk": "Красноярск",
  "Perm": "Пермь",
  "Voronezh": "Воронеж",
  "Volgograd": "Волгоград",
  "Krasnodar": "Краснодар",
  "Saratov": "Саратов",
  "Tyumen": "Тюмень",
  "Tolyatti": "Тольятти",
  "Izhevsk": "Ижевск",
  "Barnaul": "Барнаул",
  "Ulyanovsk": "Ульяновск",
  "Irkutsk": "Иркутск",
  "Khabarovsk": "Хабаровск",
  "Yaroslavl": "Ярославль",
  "Vladivostok": "Владивосток",
  "Makhachkala": "Махачкала",
  "Tomsk": "Томск",
  "Orenburg": "Оренбург",
  "Kemerovo": "Кемерово",
  "Novokuznetsk": "Новокузнецк",
  "Ryazan": "Рязань",
  "Astrakhan": "Астрахань",
  "Naberezhnye Chelny": "Набережные Челны",
  "Penza": "Пенза",
  "Lipetsk": "Липецк",
  "Kirov": "Киров",
  "Cheboksary": "Чебоксары",
  "Kaliningrad": "Калининград",
  "Kursk": "Курск",
  "Magnitogorsk": "Магнитогорск",
  "Tver": "Тверь",
  "Ivanovo": "Иваново",
  "Bryansk": "Брянск",
  "Surgut": "Сургут",
  "Vladimir": "Владимир",
  "Simferopol": "Симферополь",
  "Yakutsk": "Якутск",
  "Almaty": "Алматы",
  "Nur-Sultan": "Нур-Султан",
  "Astana": "Астана",
  "Shymkent": "Шымкент",
  "Karagandy": "Караганда",
  "Aktobe": "Актобе",
  "Taraz": "Тараз",
  "Pavlodar": "Павлодар",
  "Semey": "Семей",
  "Ust-Kamenogorsk": "Усть-Каменогорск",
};

/** Ghost marker: pulsing plus icon */
function ghostIcon(): L.DivIcon {
  return L.divIcon({
    html: `<div style="
      width:36px;height:36px;border-radius:50%;
      background:#fff;border:2px solid #D12026;
      display:flex;align-items:center;justify-content:center;
      font-size:18px;font-weight:700;color:#D12026;
      box-shadow:0 0 0 0 rgba(209,32,38,0.6);
      animation:ghostPulse 1.5s infinite;
    ">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#D12026" stroke-width="2">
        <path d="M8 2v12M2 8h12"/>
      </svg>
    </div>
    <div style="
      position:absolute;top:38px;left:50%;transform:translateX(-50%);
      white-space:nowrap;
      font-family:Inter,sans-serif;font-size:10px;font-weight:600;
      letter-spacing:0.05em;text-transform:uppercase;
      color:#D12026;text-shadow:0 1px 4px rgba(255,255,255,0.9);
    ">Ваш магазин</div>`,
    className: "",
    iconSize: [36, 60],
    iconAnchor: [18, 36],
  });
}

export default function Stores() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const clustersRef = useRef<L.MarkerClusterGroup | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const ghostAddedRef = useRef(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);

  function addGhostToMap(map: L.Map, lat: number, lng: number) {
    if (ghostAddedRef.current) return;
    ghostAddedRef.current = true;
    const ghost = L.marker([lat, lng], {
      icon: ghostIcon(),
      interactive: true,
    })
      .bindTooltip("Откройте магазин Diverse по франшизе", {
        direction: "top",
        offset: [0, -10],
        className: "ghost-tooltip",
      })
      .on("click", () => {
        document.getElementById("section-contacts")?.scrollIntoView({ behavior: "smooth" });
      });
    ghost.addTo(map);
  }

  // IP → город пользователя + ghost на карте
  // При падении (CORS, блокировка) — просто не показываем метку,
  // блок «откройте по франшизе» всё равно виден
  useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then((r) => r.json())
      .then((data) => {
        if (!data?.loc || !data?.city) return;
        const [lat, lng] = data.loc.split(",").map(Number);
        if (isNaN(lat) || isNaN(lng)) return;
        setUserCity(cityRu[data.city] ?? data.city);
        if (mapRef.current) {
          addGhostToMap(mapRef.current, lat, lng);
        } else {
          const interval = setInterval(() => {
            if (mapRef.current) {
              addGhostToMap(mapRef.current, lat, lng);
              clearInterval(interval);
            }
          }, 200);
          setTimeout(() => clearInterval(interval), 10000);
        }
      })
      .catch(() => {});
  }, []);

  // Карта
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: [60, 80],
      zoom: 3,
      minZoom: 1,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 10,
    }).addTo(map);

    function diverseMarker(): L.DivIcon {
      return L.divIcon({
        html: `<div style="display:flex;align-items:center;justify-content:center;width:28px;height:36px;">
          <svg width="28" height="36" viewBox="0 0 27 33" fill="none">
            <path d="M4.3,22.6C-0.7,17.6-0.7,9.5,4.3,4.6C6.8,2.2,10,0.8,13.5,0.8s6.7,1.3,9.2,3.7c5.1,5,5.1,13.1,0,18l-9.2,9L4.3,22.6z" fill="#D12026"/>
            <path d="M13.5,1.1c3.4,0,6.6,1.3,9.1,3.7c2.4,2.4,3.8,5.5,3.8,8.9s-1.3,6.5-3.8,8.9l-9.1,8.9l-9.1-8.9c-2.4-2.4-3.8-5.5-3.8-8.9s1.3-6.5,3.8-8.9C6.9,2.4,10.1,1.1,13.5,1.1z" fill="#a0101e" opacity="0.4"/>
            <path fill="#ffffff" fill-rule="evenodd" d="M18.7,10.6l-1.3,2.1h-6.5c-1.4,0-2.9,0.3-3.5,1.5l-0.7,1.1l-1.6,2.6h9.4c1.4,0,2.9-0.3,3.5-1.5l0.7-1.1c0.9-1.6,1.9-3.1,2.8-4.7H18.7z M16.8,13.8l-1.4,2.3c-0.3,0.5-1,0.7-1.6,0.7H8.6l1.4-2.3c0.3-0.5,1-0.7,1.6-0.7H16.8z"/>
          </svg>
        </div>`,
        className: "",
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -38],
      });
    }

    const clusters = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `<div style="
            width:40px;height:40px;border-radius:50%;
            background:#D12026;color:#fff;
            display:flex;align-items:center;justify-content:center;
            font-family:Inter,sans-serif;font-size:13px;font-weight:600;
            border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);
          ">${count}</div>`,
          className: "",
          iconSize: [40, 40],
        });
      },
    });

    const markers: L.Marker[] = [];

    stores.forEach((store, i) => {
      const marker = L.marker(ll(store.coords), {
        icon: diverseMarker(),
      })
        .bindPopup(popupHtml(store), {
          maxWidth: 260,
          className: "store-popup",
          closeButton: true,
        })
        .on("click", () => {
          setActiveIdx(i);
          const el = sidebarRef.current?.querySelector(`[data-store="${i}"]`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        });
      markers.push(marker);
      clusters.addLayer(marker);
    });

    markersRef.current = markers;
    clustersRef.current = clusters;
    map.addLayer(clusters);

    const bounds = L.latLngBounds(stores.map((s) => ll(s.coords)));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 5 });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      ghostAddedRef.current = false;
    };
  }, []);

  function focusStore(i: number) {
    const map = mapRef.current;
    const clusters = clustersRef.current;
    const marker = markersRef.current[i];
    if (!map || !clusters || !marker) return;

    clusters.zoomToShowLayer(marker, () => {
      const latlng = marker.getLatLng();
      map.setView(latlng, map.getZoom(), { animate: true });
      marker.openPopup();
    });

    setActiveIdx(i);
  }

  return (
    <section data-header="light" className="min-h-screen bg-brand-gray-100">
      <div className="container-brand py-10 md:py-12">
        {/* ——— Шапка ——— */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs eyebrow text-brand-gray-400 mb-4">
            Магазины
          </p>
          <h2 className="section-title ">
            Партнёрская сеть <span className="text-brand-accent">ООО «ХАУС»</span>
          </h2>
          <p className="section-desc ">
            11 магазинов Diverse в 10 городах России и Казахстана
          </p>

          {/* Статистика */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8">
            {citiesSummary.map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-brand-accent leading-none mb-1">
                  {s.count}
                </span>
                <span className="text-[11px] label text-brand-gray-400">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ——— Карта + список ——— */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-0 rounded-sm overflow-hidden shadow-lg bg-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Список магазинов */}
          <div
            ref={sidebarRef}
            className="order-1 lg:order-1 overflow-y-auto border-t lg:border-t-0 lg:border-r border-brand-gray-200 max-h-[320px] lg:max-h-[480px] bg-white"
          >
            <>
              <div className="px-4 py-3.5 border-l-2 border-brand-accent/40 bg-brand-accent/[0.02]">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-brand-accent/20 text-brand-accent">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 1v10M1 6h10" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-brand-black">
                      {userCity || "Ваш город"}
                    </div>
                    <div className="text-xs text-brand-accent mt-0.5 font-medium">
                      откройте по франшизе
                    </div>
                    <div className="text-xs text-brand-gray-400 mt-0.5">
                      Станьте партнёром ООО «ХАУС»
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-dashed border-brand-gray-200 mx-4" />
            </>
            {stores.map((s, i) => {
              const isActive = activeIdx === i;
              const isUfa = s.city === "Уфа";
              const cityLabel = isUfa
                ? s.mall.includes("Мега")
                  ? "Уфа (Мега)"
                  : "Уфа (Планета)"
                : s.city;

              return (
                <button
                  key={s.city + s.mall + i}
                  data-store={i}
                  onClick={() => focusStore(i)}
                  className={`w-full text-left px-4 py-3.5 border-l-2 transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "border-brand-accent bg-gradient-to-r from-brand-accent/[0.06] to-transparent shadow-[inset_0_0_20px_-12px_rgba(209,32,38,0.15)]"
                      : "border-transparent hover:bg-brand-gray-100 hover:border-brand-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-brand-accent text-white shadow-[0_0_12px_-4px_rgba(209,32,38,0.5)] scale-110"
                          : "bg-brand-gray-200 text-brand-gray-400"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-sm font-semibold truncate transition-colors duration-300 ${
                          isActive ? "text-brand-accent" : "text-brand-black"
                        }`}
                      >
                        {cityLabel}
                      </div>
                      <div className={`text-xs truncate mt-0.5 transition-colors duration-300 ${
                        isActive ? "text-brand-gray-500" : "text-brand-gray-400"
                      }`}>
                        {s.mall ? `${s.mall.replace(/[«»]/g, "")}` : s.address}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Карта */}
          <div className="order-2 lg:order-2" style={{ isolation: "isolate" }}>
            <div ref={containerRef} className="h-[320px] md:h-[480px] w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
