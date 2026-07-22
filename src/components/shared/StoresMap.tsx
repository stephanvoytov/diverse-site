"use client";

import dynamic from "next/dynamic";

const Stores = dynamic(() => import("@/components/blocks/Stores"), {
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StoresMap({ data }: { data?: any }) {
  return <Stores data={data} />;
}
