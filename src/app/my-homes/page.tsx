import ListingCard from "@/components/ListingCard";
import NoItems from "@/components/NoItems";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import FavouriteLoading from "../favourite/FavouriteLoading";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await prisma.home.findMany({
    where: {
      userId: user?.id,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      description: true,
      photo: true,
      price: true,
      favourite: {
        where: {
          userId: user?.id,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!user.id) {
    return redirect("/");
  }
  return (
    <div className="container">
      <h1 className="text-2xl font-semibold">Your Home</h1>
      {data.length === 0 ? (
        <>
          <NoItems />
        </>
      ) : (
        <>
          <Suspense fallback={<FavouriteLoading />}>
            <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <ListingCard
                      description={item.description as string}
                      homeId={item.id as string}
                      image={item.photo as string}
                      location={item.country as string}
                      favouriteId={item.favourite[0]?.id as string}
                      isFavorite={item.favourite.length > 0 ? true : false}
                      price={item.price as number}
                      userId={user?.id}
                    />
                  </div>
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
