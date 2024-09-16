"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { formSchemaType } from "../create/[id]/_components/DescriptionForm";
import { revalidatePath } from "next/cache";

export const createAirbnb = async (selectedCate: string | undefined) => {
  //   console.log(selectedCate);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (isUser) {
    const data = await prisma.home.create({
      data: {
        categoryName: selectedCate,
        addedCategory: true,
      },
    });
    return redirect(`/create/${data.id}/description`);
  }
};

interface descriptionProps {
  guestCount: number;
  bedCount: number;
  bathCount: number;
  description: string;
  myImg: string;
  price: number;
  title: string;
  id: string;
}
export const createDescription = async ({
  id,
  guestCount,
  bathCount,
  bedCount,
  description,
  myImg,
  price,
  title,
}: descriptionProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!data) {
    return redirect("/");
  }
  const guests = guestCount.toString();
  const bathrooms = bathCount.toString();
  const bedrooms = bedCount.toString();
  const myUsers = await prisma.home.update({
    where: {
      id,
    },
    data: {
      guests,
      bathrooms,
      bedrooms,
      description,
      photo: myImg,
      price,
      title,
      addedDescription: true,
    },
  });
  return redirect(`/create/${myUsers.id}/address`);
};

type locationProps = {
  locationValue: string;
  id: string;
};

export const createLocation = async ({ id, locationValue }: locationProps) => {
  // console.log(id, locationValue);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user.id) {
    return redirect("/");
  }
  const validUser = await prisma.home.findUnique({
    where: {
      id,
    },
  });
  if (
    validUser?.addedCategory === true &&
    validUser.addedDescription === true
  ) {
    const home = await prisma.home.update({
      where: {
        id,
      },
      data: {
        addedLocation: true,
        country: locationValue,
        userId: user.id,
      },
    });
    // return redirect("/");
  } else {
    return redirect("/");
  }
};

export const AddToFavourite = async (userId: string, homeId: string) => {
  // console.log(userId, homeId);
  const data = await prisma.favourite.create({
    data: {
      userId,
      homeId,
    },
  });
  revalidatePath("/");
};

export const DelFromFav = async (
  userId: string,
  homeId: string,
  favouriteId: string
) => {
  const dele = await prisma.favourite.delete({
    where: {
      id: favouriteId,
      userId,
      homeId,
    },
  });
  revalidatePath("/");
};

type Reserve = {
  userId: string;
  homeId: string;
  startDate: string;
  endDate: string;
};

export const createReservation = async ({
  endDate,
  homeId,
  startDate,
  userId,
}: Reserve) => {
  const reserving = await prisma.reservation.create({
    data: {
      userId,
      homeId,
      startDate,
      endDate,
    },
  });
  return redirect("/");
};
