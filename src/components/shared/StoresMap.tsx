"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const Stores = dynamic(() => import("@/components/blocks/Stores"), {
  ssr: false,
});

type StoresProps = ComponentProps<typeof Stores>;

export default function StoresMap({ data }: { data?: StoresProps["data"] }) {
  return <Stores data={data} />;
}
