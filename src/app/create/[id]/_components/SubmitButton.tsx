"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  return (
    <div className="fixed flex items-center border-t-2  justify-between bottom-0 z-10 w-[95%] bg-white  py-4">
      <Link href={"/"}>
        <Button type="button" className="bg-slate-600">
          Cancel
        </Button>
      </Link>
      <Button type="submit">save</Button>
    </div>
  );
};

export const AddToFavouriteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <div>
          <Button type="submit" variant={"outline"} size={"icon"} disabled>
            <Loader2 className="w-4 h-4 animate-spin" />
          </Button>
        </div>
      ) : (
        <Button
          type="submit"
          variant={"outline"}
          className="bg-primary-foreground rounded-md"
        >
          <Heart className="w-4 h-4" fill="" />
        </Button>
      )}
    </>
  );
};
export const DeleteFromFavouriteButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div>
          <Button type="submit" variant={"outline"} size={"icon"} disabled>
            <Loader2 className="w-4 h-4 animate-spin" />
          </Button>
        </div>
      ) : (
        <Button
          type="submit"
          variant={"outline"}
          className="bg-primary-foreground rounded-md"
        >
          <Heart className="w-4 h-4 text-[#e3193e]" fill="#e3193e" />
        </Button>
      )}
    </>
  );
};
