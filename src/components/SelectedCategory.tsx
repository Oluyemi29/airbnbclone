"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "./ui/card";
import Image from "next/image";
import { categoryItems, iAppProps } from "@/lib/CategoriesItems";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAirbnb } from "@/app/Action/action";
import { SubmitButton } from "@/app/create/[id]/_components/SubmitButton";

const SelectedCategory = () => {
  const [selectedCate, setSelectedCate] = useState<string | undefined>(
    undefined
  );
  const { handleSubmit } = useForm();
  const submit = () => {
    createAirbnb(selectedCate);
    console.log(selectedCate);
  };

  return (
    <div>
      <form method="post" onSubmit={handleSubmit(submit)} action="">
        <div className="flex mt-5 flex-wrap gap-10 mb-20 justify-center w-full">
          {categoryItems?.map((items, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer flex justify-center items-center"
              >
                <Card
                  className={
                    selectedCate === items.name ? "border-primary border-2" : ""
                  }
                  onClick={() => {
                    setSelectedCate(items.name);
                  }}
                >
                  <CardHeader className="text-center">
                    <Image
                      src={items.imageUrl}
                      width={100}
                      height={100}
                      alt="cate"
                      priority
                      quality={95}
                      className=""
                    />
                    <p className="font-bold">{items.name}</p>
                  </CardHeader>
                </Card>
              </div>
            );
          })}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default SelectedCategory;
