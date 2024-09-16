"use client";
import { AddToFavourite, DelFromFav } from "@/app/Action/action";
import { Countries } from "@/app/create/[id]/_components/GetCountries";
import {
  AddToFavouriteButton,
  DeleteFromFavouriteButton,
} from "@/app/create/[id]/_components/SubmitButton";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

interface ListingCardProps {
  image: string;
  description: string;
  price: number;
  location: string;
  userId: string;
  isFavorite: boolean;
  homeId: string;
  favouriteId: string;
}

const ListingCard = ({
  description,
  image,
  location,
  price,
  userId,
  isFavorite,
  homeId,
  favouriteId,
}: ListingCardProps) => {
  const countries = Countries();
  const getCountry = countries.find((item) => {
    return item.name === location;
  });
  const { handleSubmit } = useForm();
  const AddToFav = async () => {
    try {
      await AddToFavourite(userId, homeId);
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteFromFav = async () => {
    try {
      await DelFromFav(userId, homeId, favouriteId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-slate-100 rounded-tl-md rounded-tr-md">
      <div className="relative w-full h-72">
        <Image
          src={image}
          alt="image"
          fill
          className="rounded-lg h-full object-cover mb-3"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isFavorite ? (
              <>
                <form onSubmit={handleSubmit(DeleteFromFav)}>
                  <DeleteFromFavouriteButton />
                </form>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmit(AddToFav)}>
                  <AddToFavouriteButton />
                </form>
              </>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`} className="p-2">
        <h1 className="font-semibold text-base">{`${getCountry?.flag} ${getCountry?.name} / ${getCountry?.region}`}</h1>
        <p className="text-muted-foreground text-[0.7rem] line-clamp-2">
          {description}
        </p>
        <p className="font-semibold text-base">
          <span className="font-bold">${price} / Night</span>
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;
