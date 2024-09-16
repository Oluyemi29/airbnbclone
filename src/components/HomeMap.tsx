"use client";
import { Skeleton } from "@nextui-org/react";
import dynamic from "next/dynamic";
import React from "react";

const HomeMap = ({ locationValue }: { locationValue: string }) => {
  const LazyMap = dynamic(
    () => {
      return import("@/components/Map");
    },
    { ssr: false, loading: () => <Skeleton /> }
  );
  return (
    <div>
      <LazyMap locationValue={locationValue} />
    </div>
  );
};

export default HomeMap;
