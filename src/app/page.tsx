"use server";
import ListingCard from "@/components/ListingCard";
import MapFilterItems from "@/components/MapFilterItems";
import NoItems from "@/components/NoItems";
import Skeleton from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { Suspense } from "react";

type searchParamsProps = {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: number;
    bedroom?: number;
    bathroom?: number;
  };
};
type searchProps = {
  guestCount: number;
  bathCount: number;
  bedCount: number;
  locationValue: any;
};

export default async function Home({ searchParams }: searchParamsProps) {
  const filter = searchParams?.filter;
  const country = searchParams?.country;
  const guest = searchParams?.guest?.toString();
  const bedroom = searchParams?.bedroom?.toString();
  const bathroom = searchParams?.bathroom?.toString();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: filter ?? undefined,
      country: country ?? undefined,
      guests: guest ?? undefined,
      bedrooms: bedroom ?? undefined,
      bathrooms: bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      country: true,
      description: true,
      favourite: {
        where: {
          userId: user?.id ?? undefined,
        },
      },
    },
  });


  return (
    <div>
      <MapFilterItems />
      {data.length > 0 ? (
        <Suspense fallback={<Skeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full">
            {data.map((item) => {
              return (
                <ListingCard
                  key={item.id}
                  image={item.photo as string}
                  description={item.description as string}
                  price={item.price as number}
                  location={item.country as string}
                  userId={user?.id as string}
                  isFavorite={item.favourite.length > 0 ? true : false}
                  favouriteId={item.favourite[0]?.id as string}
                  homeId={item.id}
                />
              );
            })}
          </div>
        </Suspense>
      ) : (
        <NoItems />
      )}
    </div>
  );
}
