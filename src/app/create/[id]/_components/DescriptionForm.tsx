"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import Counter from "./Counter";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDescription } from "@/app/Action/action";
import { useParams } from "next/navigation";
import { SubmitButton } from "./SubmitButton";

const formSchema = z.object({
  title: z.string().min(1, "use should fill at least one character"),
  description: z.string().min(1, "use should fill at least one character"),
  price: z.coerce.number(),
  image: z
    .instanceof(File || undefined)
    .refine((value) => value.type.startsWith("image/"), "it must be an image")
    .refine(
      (value) => value.size <= 1024 * 1024 * 2,
      "the file must not be grater ths 2MB"
    ),
});
export type formSchemaType = z.infer<typeof formSchema>;
const DescriptionForm = () => {
  const params = useParams();
  const id: any = params?.id;
  // console.log(id);

  const presetName = "airbnbs";
  const cloudName = "devoluyemi";
  const [guestCount, setGuestCount] = useState<number>(0);
  const [bathCount, setBathCount] = useState<number>(0);
  const [bedCount, setBedCount] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const submit = async (value: formSchemaType) => {
    const { description, image, price, title } = value;
    console.log(image);

    const images = new FormData();
    images.append("file", image);
    images.append("upload_preset", presetName);
    const imageUrl = async () => {
      const url = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: images,
        }
      );
      const data = await url.json();
      console.log(data);
      return data.url;
    };
    const myImg: string = await imageUrl();
    createDescription({
      id,
      description,
      myImg,
      price,
      title,
      guestCount,
      bathCount,
      bedCount,
    });
  };
  return (
    <div className="">
      <form action="" onSubmit={handleSubmit(submit)} method="post">
        <div className="flex flex-col items-center mb-20 justify-center">
          <h1 className="font-semibold tracking-tighter my-3">
            Please describe your home as good as you can!
          </h1>
          <div>
            <h1 className="text-[0.7rem] mt-3">Title</h1>
            <Input
              {...register("title")}
              errorMessage={errors.title?.message}
              isInvalid={!!errors.title}
              placeholder="Short and Simple..."
              type="text"
              className="rounded-xl "
            />
            <h1 className="text-[0.7rem] mt-3">Description</h1>
            <Textarea
              {...register("description")}
              errorMessage={errors.description?.message}
              isInvalid={!!errors.description}
              placeholder="Describe your home..."
              className="rounded-xl overflow-y-auto w-full h-20 p-2 text-sm border-2 border-default"
            />
            <h1 className="text-[0.7rem] mt-3">Price</h1>
            <Input
              {...register("price")}
              errorMessage={errors.price?.message}
              isInvalid={!!errors.price}
              placeholder="Price in USD"
              type="number"
              className="rounded-xl "
            />
            <h1 className="text-[0.7rem] mt-3">Image</h1>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <Input
                    onChange={(e: any) => {
                      onChange(e.target.files[0]);
                    }}
                    type="file"
                    className="rounded-xl "
                    errorMessage={errors.image?.message}
                    isInvalid={!!errors.image}
                  />
                );
              }}
            />
          </div>
          <Card className="my-2">
            <CardHeader className="">
              <div className="flex flex-row gap-3 justify-between items-center text-[0.8rem]">
                <Counter
                  guestCount={guestCount}
                  setGuestCount={setGuestCount}
                  bedCount={bedCount}
                  setBedCount={setBedCount}
                  bathCount={bathCount}
                  setBathCount={setBathCount}
                />
              </div>
            </CardHeader>
          </Card>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

export default DescriptionForm;
