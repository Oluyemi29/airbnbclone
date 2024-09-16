import { Skeleton } from "@nextui-org/react";
import React from "react";

const FavouriteLoading = () => {
  return (
    <div className="container flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold my-5">Your Favourite</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};

export default FavouriteLoading;
