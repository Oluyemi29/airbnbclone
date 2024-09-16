import { Countries } from "@/app/create/[id]/_components/GetCountries";
import CategoryShowCase from "@/components/CategoryShowCase";
import HomeMap from "@/components/HomeMap";
import SelectCalender from "@/components/SelectCalender";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import HomeLoading from "./loading";

type paramsProps = {
  params: {
    id: string;
  };
};
const page = async ({ params }: paramsProps) => {
  const id = params.id;
  const data = await prisma.home.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      bathrooms: true,
      bedrooms: true,
      categoryName: true,
      country: true,
      description: true,
      guests: true,
      photo: true,
      price: true,
      title: true,
      User: true,
      reservation: {
        where: {
          homeId: id,
        },
      },
    },
  });
  const getCountries = Countries();
  const myCountry = getCountries.find((each) => {
    return each.name === data?.country;
  });
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <Suspense fallback={<HomeLoading />}>
      <div className="w-full flex flex-col items-center">
        <div className="w-[50%]">
          <h1 className="font-bold">{data?.title}</h1>
          <Image
            src={data?.photo as string}
            alt={data?.title as string}
            width={100}
            height={100}
            className="object-cover my-3 w-full h-96 rounded-md"
          />
        </div>
        <div className="flex gap-7 justify-between w-[50%]">
          <div className="w-full">
            <div>
              <h1 className="font-semibold">{`${myCountry?.flag} ${myCountry?.name} / ${myCountry?.region}`}</h1>
              <p className="text-[0.7rem] font-semibold">
                {data?.guests} Guest
              </p>
              <p className="text-[0.7rem] font-semibold">
                {data?.bedrooms} Bedrooms
              </p>
              <p className="text-[0.7rem] font-semibold">
                {data?.bathrooms} Bathroom
              </p>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <Image
                src={(data?.User?.profileImage as string) || "avatar.png"}
                alt={data?.User?.firstName as string}
                width={40}
                height={40}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-[0.9rem] font-semibold">
                  Hosted by {data?.User?.firstName}
                </h1>
                <h1 className="text-[0.7rem]">Hosted since 2018</h1>
              </div>
            </div>
            <Divider className="my-5" />
            <CategoryShowCase category={data?.categoryName as string} />
            <Divider className="my-5" />
            <p className="text-[0.7rem]">{data?.description}</p>
            <Divider className="my-5" />
            <HomeMap locationValue={data?.country as string} />
          </div>
          <div className="w-full">
            <SelectCalender
              userId={user.id as string}
              homeId={data?.id as string}
              reservation={data?.reservation as any}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default page;
