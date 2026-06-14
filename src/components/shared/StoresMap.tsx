"use client";

import dynamic from "next/dynamic";

const Stores = dynamic(() => import("@/components/blocks/Stores"), {
  ssr: false,
});

export default function StoresMap() {
  return <Stores />;
}
