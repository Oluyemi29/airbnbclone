"use client";
import { Rows3 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Divider } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import SearchComponent from "./SearchComponent";

const Navbar = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  console.log(user);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Image src={"/airbnb.png"} alt="" width={80} height={50} />
        </div>
        <SearchComponent/>
        <div className=" flex px-5 py-2 rounded-3xl border-2 gap-2 items-center">
          <Rows3 size={23} />
          <Dropdown>
            <DropdownTrigger>
              <Image
                className="cursor-pointer rounded-full"
                src={user?.picture || "/avatar.png"}
                width={20}
                height={20}
                alt="airbnb"
              />
            </DropdownTrigger>
            {user ? (
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem showDivider>
                  <Link href={`/create/${user.id}/structure`}>
                    Airbnb my Home
                  </Link>
                </DropdownItem>
                <DropdownItem showDivider>
                  <Link href={"/my-homes"}>My Listing</Link>
                </DropdownItem>
                <DropdownItem showDivider>
                  <Link href={"/favourite"}>My Favourite</Link>
                </DropdownItem>
                <DropdownItem showDivider>
                  <Link href={"/reservation"}>My Reservation</Link>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  <LogoutLink>Log out</LogoutLink>
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem>
                    <RegisterLink> Register </RegisterLink>
                  </DropdownItem>
                  <DropdownItem>
                    <LoginLink>Login</LoginLink>
                  </DropdownItem>
                </DropdownMenu>
              </>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
