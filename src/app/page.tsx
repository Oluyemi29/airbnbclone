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
  };
};

export default async function Home({ searchParams }: searchParamsProps) {
  // console.log(searchParams?.filter);
  const filter = searchParams?.filter;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);

  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: filter ?? undefined,
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

  // const fav = data.map((ite) => {
  //   return ite.favourite;
  // });
  // console.log(
  //   fav.map((myfav) => {
  //     return myfav;
  //   })
  // );

  return (
    <div>
      <Button>Hello world</Button>
      <MapFilterItems />
      {data.length > 0 ? (
        <Suspense fallback={<Skeleton />}>
          <div className="grid grid-cols-4 gap-5 w-full">
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
