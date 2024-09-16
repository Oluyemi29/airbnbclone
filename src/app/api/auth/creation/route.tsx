import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return NextResponse.redirect("http://localhost:3000");
  }
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user?.id,
        email: user?.email as string,
        firstName: user?.given_name ?? "",
        lastName: user?.family_name ?? "",
        profileImage:
          user?.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }
  return NextResponse.redirect("http://localhost:3000");
}
