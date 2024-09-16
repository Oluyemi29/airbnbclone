"use client";
import { categoryItems } from "@/lib/CategoriesItems";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const MapFilterItems = () => {
  const param = useSearchParams();
  const searcher = param.get("filter")
  const searching = (filter: string, name: string) => {
    const searchParams = new URLSearchParams({
      ...(filter && { filter: name }),
    });

    // console.log(param);
    return `/?${searchParams.toString()}`;
  };

  return (
    <div className="flex px-4 py-2 my-5 bg-slate-100 rounded-md gap-10 no-scroll overflow-x-auto justify-between w-full">
      {categoryItems.map((items, index) => {
        return (
          <Link key={index} href={`/${searching("filter", items.name)}`}>
            <div className={cn(searcher === items.name? "border-b-2 border-black pb-2" : "opacity-70","flex flex-col justify-center items-center w-full")}>
              <Image
                src={items.imageUrl}
                width={20}
                height={20}
                alt="pics"
                priority
                quality={95}
              />
              <p className="text-[0.6rem]">{items.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MapFilterItems;
