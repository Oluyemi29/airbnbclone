import ListingCard from "@/components/ListingCard";
import NoItems from "@/components/NoItems";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React, { Suspense } from "react";
import FavouriteLoading from "./FavouriteLoading";
import { redirect } from "next/navigation";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user.id) {
    return redirect("/");
  }
  const data = await prisma.favourite.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      homeId: true,
      Home: {
        select: {
          id: true,
          description: true,
          country: true,
          photo: true,
          price: true,
          userId: true,
        },
      },
    },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Your favorites are here
      </h1>

      {data.length === 0 ? (
        <>
          <NoItems />
        </>
      ) : (
        <>
          <Suspense fallback={<FavouriteLoading />}>
            <div className="grid grid-cols-4 gap-3">
              {data.map((item) => {
                return (
                  <ListingCard
                    key={item?.id}
                    description={item.Home?.description as string}
                    favouriteId={item?.id}
                    homeId={item.Home?.id as string}
                    image={item.Home?.photo as string}
                    location={item.Home?.country as string}
                    price={item.Home?.price as number}
                    userId={user?.id}
                    isFavorite={item?.id ? true : false}
                  />
                );
              })}
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
};

export default page;
