import { Skeleton } from "@nextui-org/react";
import React from "react";

const HomeLoading = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
      </div>
    </div>
  );
};

export default HomeLoading;
