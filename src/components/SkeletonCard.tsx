import { Skeleton } from "@nextui-org/react";
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-5">
      <Skeleton />
    </div>
  );
};

export default SkeletonCard;
