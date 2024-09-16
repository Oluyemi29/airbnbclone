import ListingCard from "@/components/ListingCard";
import NoItems from "@/components/NoItems";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import FavouriteLoading from "../favourite/FavouriteLoading";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.id) {
    return redirect("/");
  }
  const data = await prisma.reservation.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      Home: {
        select: {
          id: true,
          description: true,
          country: true,
          photo: true,
          price: true,
          userId: true,
          favourite: true,
        },
      },
    },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Your Reservation are here
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
                    key={item.id}
                    description={item.Home?.description as string}
                    favouriteId={item.Home?.favourite[0]?.id as string}
                    homeId={item.Home?.id as string}
                    image={item.Home?.photo as string}
                    location={item.Home?.country as string}
                    price={item.Home?.price as number}
                    userId={user.id}
                    isFavorite={item.Home?.favourite[0]?.id ? true : false}
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
